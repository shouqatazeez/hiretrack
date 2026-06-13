import json
import httpx
from fastapi import HTTPException, status
from app.core.config import GEMINI_API_KEY


GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent"


def _call_gemini(prompt: str) -> dict:
    """Send a prompt to Gemini and return the parsed JSON response."""
    url = f"{GEMINI_URL}?key={GEMINI_API_KEY}"

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "temperature": 0.7,
            "responseMimeType": "application/json",
        },
    }

    response = httpx.post(url, json=payload, timeout=60.0)

    if response.status_code == 429:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="AI rate limit reached. Please try again in a minute.",
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI service error. Please try again.",
        )

    data = response.json()

    # Extract text from Gemini response
    try:
        content = data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError):
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI returned an unexpected response.",
        )

    # Parse JSON (responseMimeType should ensure clean JSON, but strip fences just in case)
    content = content.strip()
    if content.startswith("```json"):
        content = content[7:]
    elif content.startswith("```"):
        content = content.split("\n", 1)[1] if "\n" in content else content[3:]
    if content.endswith("```"):
        content = content[:-3]
    content = content.strip()

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI returned invalid response format.",
        )


def call_ai(prompt: str) -> dict:
    """Call Gemini AI."""
    if not GEMINI_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI service is not configured.",
        )
    return _call_gemini(prompt)


def get_match_score(resume_text: str, job_title: str, company_name: str, job_description: str) -> dict:
    """Get a match score comparing resume against a job."""
    prompt = f"""You are a career advisor. Analyze how well this resume matches the job below.

JOB TITLE: {job_title}
COMPANY: {company_name}
JOB DESCRIPTION:
{job_description}

RESUME:
{resume_text}

Return a JSON object with exactly this structure:
{{
  "score": <number 0-100>,
  "sub_scores": {{
    "skills": <number 0-100>,
    "experience": <number 0-100>,
    "projects": <number 0-100>,
    "keywords": <number 0-100>
  }},
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "gaps": ["<gap 1>", "<gap 2>", "<gap 3>"],
  "recommendations": ["<actionable recommendation 1>", "<actionable recommendation 2>", "<actionable recommendation 3>"]
}}

Be specific and reference actual skills/experience from the resume and requirements from the job description. Each recommendation should be a concise, actionable bullet point."""

    return call_ai(prompt)


def generate_interview_questions(job_title: str, company_name: str, job_description: str, resume_text: str = "") -> dict:
    """Generate interview questions for a job."""
    resume_context = f"\nCANDIDATE RESUME:\n{resume_text}" if resume_text else ""

    prompt = f"""You are a career advisor. Generate interview questions for this position.

JOB TITLE: {job_title}
COMPANY: {company_name}
JOB DESCRIPTION:
{job_description}
{resume_context}

Return a JSON object with exactly this structure:
{{
  "questions": [
    {{"question": "<the question>", "category": "<behavioral|technical|situational>", "tip": "<brief tip on how to approach this>"}},
    ...
  ]
}}

Generate exactly 10 questions. Mix behavioral, technical, and situational questions relevant to the specific role and job description."""

    return call_ai(prompt)


def generate_cover_letter(resume_text: str, job_title: str, company_name: str, job_description: str, user_name: str) -> dict:
    """Generate a professional cover letter for a job application."""
    prompt = f"""You are a professional career advisor writing a cover letter. Follow these rules strictly:

APPLICANT NAME: {user_name}
JOB TITLE: {job_title}
COMPANY: {company_name}
JOB DESCRIPTION:
{job_description}

RESUME:
{resume_text}

RULES:
- Only use information that actually exists in the resume. Never invent skills, projects, phone numbers, emails, or experience.
- If contact info (email, phone) is in the resume, include it. If not, omit gracefully.
- Keep length between 300-450 words.
- Avoid generic buzzwords, excessive flattery, and repetitive AI phrasing.
- Make it feel personalized to both the role and the specific company.
- Reference relevant projects and technologies from the resume.

FORMAT THE COVER LETTER EXACTLY LIKE THIS:
1. Header: Applicant name (and email/phone only if found in resume), current date, company name, subject line
2. Introduction: State the position, express interest, brief candidate background
3. Skills & Experience: Highlight matching technical skills, reference specific projects, mention measurable impact
4. Company Alignment: Why this company specifically, connect candidate goals with company mission/products
5. Closing: Reaffirm interest, thank hiring manager, express willingness to discuss further
6. Sign off with "Sincerely, [Name]"

Return a JSON object with exactly this structure:
{{
  "cover_letter": "<the full formatted cover letter text following the structure above>"
}}"""

    return call_ai(prompt)


def evaluate_answer(question: str, answer: str, job_title: str, category: str = "") -> dict:
    """Evaluate a user's interview answer and provide coaching feedback."""
    category_context = f"\nQuestion Category: {category}" if category else ""

    prompt = f"""You are an expert interview coach. Evaluate this candidate's answer to an interview question.

JOB TITLE: {job_title}
INTERVIEW QUESTION: {question}{category_context}

CANDIDATE'S ANSWER:
{answer}

Evaluate the answer on clarity, relevance, depth, and structure. Return a JSON object with exactly this structure:
{{
  "score": <number 1-10, one decimal place>,
  "strengths": ["<specific strength 1>", "<specific strength 2>"],
  "improvements": ["<specific improvement 1>", "<specific improvement 2>"],
  "suggested_answer": "<a concise improved version of their answer, 2-3 paragraphs max>"
}}

Be encouraging but honest. Reference specific parts of their answer in your feedback."""

    return call_ai(prompt)
