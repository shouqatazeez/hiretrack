import { useEffect, useState } from 'react'

export default function MatchScoreCircle({ score = 0, size = 120, strokeWidth = 10 }) {
  const [offset, setOffset] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI

  useEffect(() => {
    const progress = Math.max(0, Math.min(score, 100))
    const strokeDashOffset = circumference - (progress / 100) * circumference
    const timer = setTimeout(() => {
      setOffset(strokeDashOffset)
    }, 100)
    return () => clearTimeout(timer)
  }, [score, circumference])

  const getColor = (s) => {
    if (s >= 80) return { stroke: 'stroke-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10' }
    if (s >= 60) return { stroke: 'stroke-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10' }
    return { stroke: 'stroke-rose-500', text: 'text-rose-400', bg: 'bg-rose-500/10' }
  }

  const colors = getColor(score)

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size}>
        {/* Track */}
        <circle
          className="stroke-zinc-800/60"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress Ring */}
        <circle
          className={`${colors.stroke} transition-all duration-1000 ease-out`}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {/* Center Label */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold tracking-tight ${colors.text}`}>{score}%</span>
        <span className="text-[9px] uppercase tracking-widest font-bold text-zinc-500">Match</span>
      </div>
    </div>
  )
}
