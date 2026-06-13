import { useState } from 'react'
import { Check, CheckCircle2, Copy, Download, FileText, Loader2, RefreshCw } from 'lucide-react'
import { Button } from '../ui/button'

export default function CoverLetterDocument({ coverLetter, jobTitle, companyName, onRegenerate, regenerating }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadTxt = () => {
    const element = document.createElement("a")
    const file = new Blob([coverLetter], { type: 'text/plain;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = `${companyName.replace(/\s+/g, '_')}_${jobTitle.replace(/\s+/g, '_')}_Cover_Letter.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const generatedAt = new Date().toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  return (
    <div className="space-y-4">
      {/* Generation Metadata */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-zinc-500 px-1">
        <span>Generated For: <span className="text-zinc-300 font-medium">{jobTitle}</span></span>
        <span>Company: <span className="text-zinc-300 font-medium">{companyName}</span></span>
        <span>Type: <span className="text-zinc-300 font-medium">Professional Cover Letter</span></span>
        <span>Generated: <span className="text-zinc-300 font-medium">{generatedAt}</span></span>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap justify-between items-center gap-3 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
        <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider pl-1">
          Cover Letter
        </span>
        <div className="flex flex-wrap gap-2">
          {onRegenerate && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
              disabled={regenerating}
              className="gap-1.5 text-xs hover:bg-zinc-800 hover:text-zinc-50 cursor-pointer"
            >
              {regenerating ? (
                <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating...</>
              ) : (
                <><RefreshCw className="h-3.5 w-3.5 text-primary" /> Regenerate</>
              )}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={regenerating}
            className="gap-1.5 text-xs hover:bg-zinc-800 hover:text-zinc-50 cursor-pointer"
          >
            {copied ? (
              <><Check className="h-3.5 w-3.5 text-emerald-400" /> Copied</>
            ) : (
              <><Copy className="h-3.5 w-3.5 text-zinc-400" /> Copy</>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadTxt}
            disabled={regenerating}
            className="gap-1.5 text-xs hover:bg-zinc-800 hover:text-zinc-50 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-zinc-400" /> Download TXT
          </Button>
        </div>
      </div>

      {/* Document Sheet */}
      <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-6 md:p-8 shadow-inner overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/80 via-emerald-400/50 to-primary/30" />

        {regenerating ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <Loader2 className="h-7 w-7 text-primary animate-spin" />
            <p className="text-sm text-zinc-400">Generating a personalized cover letter...</p>
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-sm leading-7 text-zinc-300 font-sans">
            {coverLetter}
          </div>
        )}
      </div>

      {/* Personalization Summary */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4">
        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Personalized Using</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-zinc-300">
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Resume Skills</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Resume Projects</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Job Description</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Company Information</span>
        </div>
      </div>
    </div>
  )
}
