import { useEffect, useState } from 'react'
import { Check, CheckCircle2, Edit3, Loader2, Sparkles } from 'lucide-react'
import { Button } from '../ui/button'
import { getAnswerFeedback } from '../../services/aiService'

export default function AnswerSandbox({ jobId, questionIndex, question, category, onComplete }) {
  const storageKey = `interview_answer_${jobId}_${questionIndex}`
  const feedbackKey = `interview_feedback_${jobId}_${questionIndex}`
  const completeKey = `interview_complete_${jobId}_${questionIndex}`

  const [answer, setAnswer] = useState('')
  const [saved, setSaved] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [feedbackLoading, setFeedbackLoading] = useState(false)
  const [feedbackError, setFeedbackError] = useState(null)
  const [completed, setCompleted] = useState(false)

  // Load saved state
  useEffect(() => {
    const savedAnswer = localStorage.getItem(storageKey)
    if (savedAnswer) setAnswer(savedAnswer)

    const savedFeedback = localStorage.getItem(feedbackKey)
    if (savedFeedback) {
      try { setFeedback(JSON.parse(savedFeedback)) } catch {}
    }

    const savedComplete = localStorage.getItem(completeKey)
    if (savedComplete === 'true') setCompleted(true)
  }, [storageKey, feedbackKey, completeKey])

  const handleChange = (e) => {
    const val = e.target.value
    setAnswer(val)
    localStorage.setItem(storageKey, val)
    setSaved(true)
  }

  useEffect(() => {
    if (!saved) return
    const timer = setTimeout(() => setSaved(false), 2000)
    return () => clearTimeout(timer)
  }, [saved, answer])

  const handleGetFeedback = async () => {
    if (!answer.trim()) return
    try {
      setFeedbackLoading(true)
      setFeedbackError(null)
      const result = await getAnswerFeedback(jobId, question, answer, category)
      setFeedback(result)
      localStorage.setItem(feedbackKey, JSON.stringify(result))
    } catch (err) {
      setFeedbackError(err.response?.data?.detail || 'Failed to get feedback.')
    } finally {
      setFeedbackLoading(false)
    }
  }

  const handleMarkComplete = () => {
    const newState = !completed
    setCompleted(newState)
    localStorage.setItem(completeKey, String(newState))
    if (onComplete) onComplete(questionIndex, newState)
  }

  return (
    <div className="space-y-4">
      {/* Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-zinc-400 flex items-center gap-1.5">
            <Edit3 className="h-3.5 w-3.5 text-primary" /> Practice Sandbox
          </label>
          <span className="text-zinc-500 font-medium">
            {saved ? (
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <Check className="h-3 w-3" /> Auto-saved
              </span>
            ) : (
              `${answer.length} / 1000`
            )}
          </span>
        </div>
        <textarea
          value={answer}
          onChange={handleChange}
          maxLength={1000}
          placeholder="Type your response here to practice..."
          className="w-full min-h-[120px] rounded-xl border border-zinc-800 bg-zinc-950/60 p-3.5 text-sm text-zinc-200 placeholder-zinc-600 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition resize-y"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button
          variant="default"
          size="sm"
          disabled={feedbackLoading || !answer.trim()}
          onClick={handleGetFeedback}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {feedbackLoading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing...</>
          ) : (
            <><Sparkles className="h-4 w-4" /> Get AI Feedback</>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkComplete}
          className={`gap-2 ${completed ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' : ''}`}
        >
          <CheckCircle2 className={`h-4 w-4 ${completed ? 'text-emerald-400' : ''}`} />
          {completed ? 'Completed' : 'Mark Complete'}
        </Button>
      </div>

      {/* Error */}
      {feedbackError && (
        <p className="text-xs text-rose-400 bg-rose-950/20 border border-rose-800/30 p-3 rounded-lg">{feedbackError}</p>
      )}

      {/* AI Feedback Panel */}
      {feedback && (
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> AI Feedback
            </h4>
            <span className={`text-lg font-bold ${
              feedback.score >= 8 ? 'text-emerald-400' : feedback.score >= 6 ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {feedback.score}/10
            </span>
          </div>

          {/* Strengths */}
          {feedback.strengths?.length > 0 && (
            <div>
              <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2">Strengths</p>
              <ul className="space-y-1.5">
                {feedback.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                    <span className="text-emerald-400 shrink-0">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvements */}
          {feedback.improvements?.length > 0 && (
            <div>
              <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">Areas to Improve</p>
              <ul className="space-y-1.5">
                {feedback.improvements.map((imp, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                    <span className="text-amber-400 shrink-0">•</span> {imp}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggested Answer */}
          {feedback.suggested_answer && (
            <div>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Suggested Answer</p>
              <p className="text-xs leading-relaxed text-zinc-300 bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-3">
                {feedback.suggested_answer}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
