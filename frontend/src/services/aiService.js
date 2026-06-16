import api from './api'

export async function getMatchScore(jobId) {
  const response = await api.post(`/jobs/applications/${jobId}/match-score`)
  return response.data
}

export async function getInterviewQuestions(jobId) {
  const response = await api.post(`/jobs/applications/${jobId}/interview-questions`)
  return response.data
}

export async function getCoverLetter(jobId) {
  const response = await api.post(`/jobs/applications/${jobId}/cover-letter`)
  return response.data
}

export async function getAnswerFeedback(jobId, question, answer, category = '') {
  const response = await api.post(`/jobs/applications/${jobId}/answer-feedback`, {
    question,
    answer,
    category,
  })
  return response.data
}

export async function getReferralMessage(jobId) {
  const response = await api.post(`/jobs/applications/${jobId}/referral-message`)
  return response.data
}
