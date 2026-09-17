'use client'

import { Droplets } from 'lucide-react'
import { useEffect, useState } from 'react'
import { START_WATER, CRISIS_THRESHOLD } from '@/lib/game/logic'
import { cn } from '@/lib/utils'

/** Animated water-token gauge. Turns alert-red when reserves hit crisis. */
export function WaterMeter({
  value,
  size = 'lg',
}: {
  value: number
  size?: 'lg' | 'sm'
}) {
  const [display, setDisplay] = useState(value)
  const crisis = value < CRISIS_THRESHOLD
  const pct = Math.max(0, Math.min(100, (value / START_WATER) * 100))

  useEffect(() => {
    if (display === value) return
    const step = display < value ? 1 : -1
    const id = setInterval(() => {
      setDisplay((d) => {
        if (d === value) {
          clearInterval(id)
          return d
        }
        return d + step
      })
    }, 55)
    return () => clearInterval(id)
  }, [value, display])

  return (
    <div className={cn('w-full', size === 'lg' ? 'max-w-md' : 'max-w-[180px]')}>
      <div className="mb-2 flex items-center justify-between">
        <div
          className={cn(
            'flex items-center gap-2 font-medium uppercase tracking-widest',
            size === 'lg' ? 'text-sm' : 'text-[10px]',
            crisis ? 'text-alert' : 'text-water',
          )}
        >
          <Droplets className={size === 'lg' ? 'size-4' : 'size-3'} />
          อ่างเก็บน้ำส่วนกลาง
        </div>
        <div
          className={cn(
            'font-display font-bold tabular-nums',
            size === 'lg' ? 'text-2xl' : 'text-base',
            crisis ? 'text-alert text-glow-alert' : 'text-water text-glow-water',
          )}
        >
          {display}
        </div>
      </div>
      <div
        className={cn(
          'relative h-3 w-full overflow-hidden rounded-full border',
          crisis ? 'border-alert/40 bg-alert/5' : 'border-water/30 bg-water/5',
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            crisis ? 'bg-alert' : 'bg-water',
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
