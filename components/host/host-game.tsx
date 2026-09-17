'use client'

import { AlertTriangle, Crown, Loader2, ShieldX } from 'lucide-react'
import { EventCard } from '@/components/game/event-card'
import { TimerRing } from '@/components/game/timer-ring'
import { ROLE_META } from '@/lib/game/content'
import { MAYOR_SECONDS } from '@/lib/game/logic'
import { useHostGame } from '@/hooks/use-host-game'
import type { GameState } from '@/lib/game/types'
import { HostHud } from './host-hud'
import { HostLobby } from './host-lobby'
import { HostVoting } from './host-voting'
import { HostEndgame, HostResult } from './host-result'

export function HostGame() {
  const { state, transport, startGame, continueFromResult, playAgain } = useHostGame()

  if (!state) {
    return (
      <div className="grid min-h-dvh place-items-center bg-atmosphere">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="size-5 animate-spin text-water" />
          กำลังเตรียมอ่างเก็บน้ำ...
        </div>
      </div>
    )
  }

  const isEndgame = state.phase === 'game_over' || state.phase === 'victory'

  return (
    <main className="flex min-h-dvh flex-col bg-atmosphere text-foreground">
      {!isEndgame && <HostHud state={state} transport={transport} />}

      {state.phase === 'lobby' && <HostLobby state={state} onStart={startGame} />}
      {state.phase === 'event_reveal' && <HostEventReveal state={state} />}
      {state.phase === 'voting' && <HostVoting state={state} offset={0} />}
      {state.phase === 'mayor_action' && <HostMayor state={state} />}
      {state.phase === 'round_result' && (
        <HostResult state={state} onContinue={continueFromResult} />
      )}
      {isEndgame && <HostEndgame state={state} onPlayAgain={playAgain} />}
    </main>
  )
}

function HostEventReveal({ state }: { state: GameState }) {
  if (!state.currentEvent) return null

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-6 px-6 py-8">
      {state.vetoedEvent ? (
        <div className="flex flex-col items-center gap-4 text-alert">
          <ShieldX className="size-16 animate-bounce" />
          <p className="font-display text-4xl font-black uppercase tracking-widest text-glow-alert">ยับยั้ง (VETO)!</p>
          <p className="text-xl text-muted-foreground">นายกเทศมนตรีใช้สิทธิยับยั้งเหตุการณ์นี้ น้ำทั้งหมดจะไม่ถูกหัก</p>
        </div>
      ) : (
        <>
          <p className="animate-float-up text-sm uppercase tracking-[0.4em] text-alert/90">
            เหตุการณ์ในรอบนี้...
          </p>
          <EventCard event={state.currentEvent} />
          <p className="max-w-md animate-float-up text-center text-pretty text-muted-foreground">
            วิกฤตกำลังจะมา เตรียมตัวโหวตว่าจะลงทุนเพื่อความอยู่รอดหรือไม่
          </p>
        </>
      )}
    </div>
  )
}

function HostMayor({ state }: { state: GameState }) {
  const mayor = state.players.find((p) => p.role === 'mayor')
  
  if (state.martialLawActive) {
    return (
      <div className="flex flex-1 animate-crisis flex-col items-center justify-center gap-8 px-6 py-8 text-center bg-red-950/20">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-alert">
            <AlertTriangle className="size-8 animate-pulse-ring text-red-500" />
            <span className="font-display text-3xl font-bold uppercase tracking-widest text-red-500">กฎอัยการศึก!</span>
            <AlertTriangle className="size-8 animate-pulse-ring text-red-500" />
          </div>
          <h2 className="max-w-2xl font-display text-4xl font-black text-balance text-glow-alert sm:text-5xl text-red-400">
            นายกฯ ยึดอำนาจจัดสรรน้ำ
          </h2>
          <p className="max-w-xl text-pretty text-lg text-foreground/90">
            ไม่มีการโหวต! นายกเทศมนตรีกำลังตัดสินใจว่ากลุ่มใดจะรอด และกลุ่มใดจะถูกตัดน้ำ
          </p>
        </div>
        <TimerRing timerEnds={state.timerEnds} totalSeconds={MAYOR_SECONDS} size={140} danger />
      </div>
    )
  }

  return (
    <div className="flex flex-1 animate-crisis flex-col items-center justify-center gap-8 px-6 py-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 text-alert">
          <AlertTriangle className="size-8 animate-pulse-ring" />
          <span className="font-display text-2xl font-bold uppercase tracking-widest">วิกฤต!</span>
          <AlertTriangle className="size-8 animate-pulse-ring" />
        </div>
        <h2 className="max-w-2xl font-display text-4xl font-black text-balance text-alert text-glow-alert sm:text-5xl">
          น้ำไม่พอจ่าย
        </h2>
        <p className="max-w-xl text-pretty text-lg text-foreground/90">
          น้ำในอ่างเก็บน้ำลดลงจนถึงขีดอันตราย นายกเทศมนตรีต้องเลือกตัดน้ำ 1 กลุ่ม
        </p>
      </div>

      <TimerRing timerEnds={state.timerEnds} totalSeconds={MAYOR_SECONDS} size={140} danger />

      <div className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-gold/10 px-5 py-3">
        <Crown className="size-6 text-gold" />
        <p className="text-pretty text-gold">
          {mayor
            ? `ท่านนายกฯ ${mayor.name} กำลังตัดสินใจ...`
            : 'ไม่มีนายกเทศมนตรี — โชคชะตาจะเป็นผู้ตัดสินใจแทน'}
        </p>
      </div>
    </div>
  )
}
