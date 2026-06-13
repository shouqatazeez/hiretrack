import { useState } from 'react'
import { Copy, Check, Download, FileText } from 'lucide-react'
import { Button } from '../ui/button'

export default function CoverLetterDocument({ coverLetter, jobTitle, companyName, onRegenerate, regenerating }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([coverLetter], { type: 'text/plain;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = `${companyName.replace(/\s+/g, '_')}_${jobTitle.replace(/\s+/g, '_')}_Cover_Letter.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex justify-between items-center bg-zinc-900/60 p-3 rounded-2xl border border-zinc-800/80">
        <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider pl-1">
          Document Output
        </span>
        <div className="flex gap-2">
          {onRegenerate && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
              disabled={regenerating}
              className="gap-1.5 text-xs hover:bg-zinc-800 hover:text-zinc-50 cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5 text-primary" />
              Regenerate
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-1.5 text-xs hover:bg-zinc-800 hover:text-zinc-50 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-zinc-400" />
                Copy
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="gap-1.5 text-xs hover:bg-zinc-800 hover:text-zinc-50 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-zinc-400" />
            Download .txt
          </Button>
        </div>
      </div>

      {/* Document Sheet */}
      <div className="relative rounded-3xl border border-zinc-800/80 bg-zinc-950/80 p-8 md:p-10 shadow-inner overflow-hidden">
        {/* Top page decoration line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-80" />
        
        <div className="whitespace-pre-wrap text-[14px] leading-relaxed text-zinc-300 font-sans tracking-wide">
          {coverLetter}
        </div>
      </div>
    </div>
  )
}
