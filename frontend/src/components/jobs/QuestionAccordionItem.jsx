import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'
import AnswerSandbox from './AnswerSandbox'

export default function QuestionAccordionItem({ question, index, jobId, onComplete }) {
  const [isOpen, setIsOpen] = useState(false)
  const completeKey = `interview_complete_${jobId}_${index}`
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(completeKey)
    if (saved === 'true') setCompleted(true)
  }, [completeKey])

  const handleComplete = (idx, state) => {
    setCompleted(state)
    if (onComplete) onComplete(idx, state)
  }

  const getCategoryColor = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'behavioral':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'technical':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      case 'situational':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      default:
        return 'bg-zinc-800/40 text-zinc-400 border-zinc-700/30'
    }
  }

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:border-zinc-700/50 ${
      completed ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-zinc-800/80 bg-zinc-900/30'
    }`}>
      {/* Header Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between p-4 text-left gap-3 hover:bg-zinc-800/20 transition-colors"
      >
        <div className="flex gap-3 items-start flex-1">
          <span className={`shrink-0 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
            completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-300'
          }`}>
            {completed ? '✓' : index + 1}
          </span>
          <div className="flex-1">
            <p className={`text-sm font-medium pr-4 ${completed ? 'text-zinc-400' : 'text-zinc-200'}`}>
              {question.question}
            </p>
            <span className={`mt-4 inline-block border px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${getCategoryColor(question.category)}`}>
              {question.category || 'General'}
            </span>
          </div>
        </div>
        <div className="shrink-0 text-zinc-500 mt-1">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {/* Accordion Body */}
      {isOpen && (
        <div className="border-t border-zinc-800/60 bg-zinc-950/20 p-4 space-y-4">
          {/* AI Coach Tip */}
          {question.tip && (
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 flex gap-3">
              <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">AI Coach Tip</span>
                <p className="text-xs leading-relaxed text-zinc-300">{question.tip}</p>
              </div>
            </div>
          )}
          
          {/* Answer Sandbox with AI Feedback */}
          <AnswerSandbox
            jobId={jobId}
            questionIndex={index}
            question={question.question}
            category={question.category}
            onComplete={handleComplete}
          />
        </div>
      )}
    </div>
  )
}
