'use client'

import { useCountdown } from '@/hooks/use-countdown'
import { cn } from '@/lib/utils'

/** Circular countdown driven by the host's authoritative timer end. */
export function TimerRing({
  timerEnds,
  totalSeconds,
  offset = 0,
  size = 132,
  danger = false,
}: {
  timerEnds: number | null
  totalSeconds: number
  offset?: number
  size?: number
  danger?: boolean
}) {
  const remainingMs = useCountdown(timerEnds, offset)
  const seconds = Math.ceil(remainingMs / 1000)
  const frac = Math.max(0, Math.min(1, remainingMs / (totalSeconds * 1000)))

  const stroke = 8
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const low = seconds <= 5

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-muted/40"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - frac)}
          className={cn(
            'transition-[stroke-dashoffset] duration-200 ease-linear',
            danger || low ? 'stroke-alert' : 'stroke-water',
          )}
        />
      </svg>
      <span
        className={cn(
          'absolute font-display font-bold tabular-nums',
          danger || low ? 'text-alert text-glow-alert' : 'text-foreground',
        )}
        style={{ fontSize: size * 0.34 }}
      >
        {seconds}
      </span>
    </div>
  )
}
