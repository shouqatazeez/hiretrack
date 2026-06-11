import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'

export default function ActivityChart({ data = [] }) {
	const [hoveredIdx, setHoveredIdx] = useState(null)

	// Fallback structure to ensure a complete weekly axis renders when no application data is present.
	const chartData = data.length > 0 ? data : [
		{ label: 'Mon', count: 0 },
		{ label: 'Tue', count: 0 },
		{ label: 'Wed', count: 0 },
		{ label: 'Thu', count: 0 },
		{ label: 'Fri', count: 0 },
		{ label: 'Sat', count: 0 },
		{ label: 'Sun', count: 0 },
	]

	const maxCount = Math.max(...chartData.map(d => d.count), 4)

	const width = 500
	const height = 200
	const paddingLeft = 35
	const paddingRight = 15
	const paddingTop = 15
	const paddingBottom = 25

	const graphWidth = width - paddingLeft - paddingRight
	const graphHeight = height - paddingTop - paddingBottom

	const points = chartData.map((d, i) => {
		const x = paddingLeft + (i / (chartData.length - 1)) * graphWidth
		const y = paddingTop + graphHeight - (d.count / maxCount) * graphHeight
		return { x, y, ...d }
	})

	// Build SVG path data for the line chart connecting day coordinates.
	const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

	// Close the SVG path back to the baseline x-coordinates to fill the gradient area.
	const areaPath = points.length > 0 
		? `${linePath} L ${points[points.length - 1].x} ${paddingTop + graphHeight} L ${points[0].x} ${paddingTop + graphHeight} Z`
		: ''

	const ticks = []
	for (let i = 0; i <= 4; i++) {
		const val = Math.round((maxCount / 4) * i)
		const y = paddingTop + graphHeight - (i / 4) * graphHeight
		ticks.push({ val, y })
	}

	return (
		<Card className="border border-zinc-800/80 bg-zinc-900/75 p-5 shadow-lg shadow-black/10">
			<CardHeader className="p-0 pb-4">
				<CardTitle className="text-base font-semibold text-zinc-50">Application Activity</CardTitle>
				<p className="text-xs text-zinc-500">Timeline of job submissions over the last 7 days</p>
			</CardHeader>
			<CardContent className="p-0 relative h-[210px] w-full">
				{hoveredIdx !== null && points[hoveredIdx] && (
					<div 
						className="absolute z-20 rounded-lg border border-zinc-850 bg-zinc-950/95 px-2.5 py-1.5 text-xs shadow-xl pointer-events-none animate-in fade-in zoom-in-95 duration-100"
						style={{
							left: `${(points[hoveredIdx].x / width) * 100}%`,
							top: `${(points[hoveredIdx].y / height) * 100 - 45}%`,
							transform: 'translateX(-50%)',
						}}
					>
						<p className="font-semibold text-zinc-100">{points[hoveredIdx].label}</p>
						<p className="text-primary mt-0.5 font-medium">
							{points[hoveredIdx].count} {points[hoveredIdx].count === 1 ? 'application' : 'applications'}
						</p>
					</div>
				)}

				<svg 
					viewBox={`0 0 ${width} ${height}`} 
					className="w-full h-full overflow-visible select-none"
				>
					<defs>
						<linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
							<stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
						</linearGradient>
					</defs>

					{ticks.map((t, idx) => (
						<g key={idx}>
							<line 
								x1={paddingLeft} 
								y1={t.y} 
								x2={width - paddingRight} 
								y2={t.y} 
								stroke="#27272a" 
								strokeWidth="1"
								strokeDasharray="4 4"
							/>
							<text 
								x={paddingLeft - 8} 
								y={t.y + 4} 
								fill="#71717a" 
								fontSize="10" 
								textAnchor="end"
								className="font-medium"
							>
								{t.val}
							</text>
						</g>
					))}

					{/* Vertical dashed guideline aligning with the currently hovered data point */}
					{hoveredIdx !== null && points[hoveredIdx] && (
						<line 
							x1={points[hoveredIdx].x} 
							y1={paddingTop} 
							x2={points[hoveredIdx].x} 
							y2={paddingTop + graphHeight} 
							stroke="#3f3f46" 
							strokeWidth="1.5"
							strokeDasharray="3 3"
						/>
					)}

					{points.map((p, idx) => (
						<text 
							key={idx}
							x={p.x} 
							y={height - 6} 
							fill={hoveredIdx === idx ? "var(--color-primary)" : "#71717a"}
							fontSize="10" 
							textAnchor="middle"
							className="font-medium transition-colors duration-150"
						>
							{p.label}
						</text>
					))}

					<path 
						d={areaPath} 
						fill="url(#chartGrad)" 
					/>

					<path 
						d={linePath} 
						fill="none" 
						stroke="var(--color-primary)" 
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>

					{points.map((p, idx) => (
						<g key={idx}>
							<rect 
								x={p.x - graphWidth / (chartData.length * 1.5)} 
								y={paddingTop} 
								width={graphWidth / (chartData.length - 1)} 
								height={graphHeight} 
								fill="transparent"
								className="cursor-pointer"
								onMouseEnter={() => setHoveredIdx(idx)}
								onMouseLeave={() => setHoveredIdx(null)}
							/>
							{(hoveredIdx === idx || p.count > 0) && (
								<circle 
									cx={p.x} 
									cy={p.y} 
									r={hoveredIdx === idx ? "5" : "3.5"} 
									fill="var(--color-background)" 
									stroke="var(--color-primary)" 
									strokeWidth={hoveredIdx === idx ? "2.5" : "2"}
									className="transition-all duration-100 pointer-events-none"
								/>
							)}
						</g>
					))}
				</svg>
			</CardContent>
		</Card>
	)
}
