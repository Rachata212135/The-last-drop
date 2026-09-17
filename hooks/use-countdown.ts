'use client'

import { useEffect, useState } from 'react'

/**
 * Returns remaining milliseconds until `timerEnds` (host clock), corrected by
 * `offset` (host clock - local clock). Updates on an animation frame so both
 * the numeric readout and any ring animation stay smooth.
 */
export function useCountdown(timerEnds: number | null, offset = 0): number {
  const [remaining, setRemaining] = useState(0)

  useEffect(() => {
    if (!timerEnds) {
      setRemaining(0)
      return
    }
    let raf = 0
    const tick = () => {
      const left = timerEnds - (Date.now() + offset)
      setRemaining(Math.max(0, left))
      if (left > 0) raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [timerEnds, offset])

  return remaining
}
