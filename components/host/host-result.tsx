'use client'

import { ArrowRight, ShieldCheck, Skull, Trophy, Droplets } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FactionCrisis } from '@/components/game/faction-crisis'
import { ROLE_META, FACTIONS } from '@/lib/game/content'
import { collapsedFactions } from '@/lib/game/logic'
import type { GameState } from '@/lib/game/types'
import { cn } from '@/lib/utils'

export function HostResult({
  state,
  onContinue,
}: {
  state: GameState
  onContinue: () => void
}) {
  const result = state.lastResult
  const isLast = state.round >= state.maxRounds

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center gap-8 px-6 py-8">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          สรุปผลรอบที่ {state.round}
        </p>
        <h2 className="font-display text-3xl font-bold sm:text-4xl text-glow-water">หลังพายุสงบ</h2>
      </div>

      {result && (
        <div className="w-full space-y-3">
          <SummaryLine
            tone="neutral"
            text={
              state.vetoedEvent
                ? 'นายกเทศมนตรียับยั้งเหตุการณ์นี้ น้ำทั้งหมดถูกคืนกลับอ่าง!'
                : result.event
                  ? `เหตุการณ์: ${result.event.name} ทำให้น้ำหายไป ${result.event.cost} หยด`
                  : 'เหตุการณ์ในรอบนี้ผ่านไปอย่างเงียบเชียบ'
            }
          />
          {state.bonusWaterNextRound > 0 && (
            <SummaryLine
              tone="toxic"
              icon={Droplets}
              text={`เกษตรกรทำสำเร็จ! ได้รับโบนัสน้ำพิเศษ +${state.bonusWaterNextRound} หยดในรอบถัดไป`}
            />
          )}
          {state.martialLawActive ? (
             <SummaryLine
               tone="alert"
               text="ประกาศกฎอัยการศึก! นายกฯ ยึดอำนาจจัดสรร กลุ่มที่ไม่ได้รับการคุ้มครองต้องเผชิญวิกฤต!"
             />
          ) : (
            <SummaryLine
              tone="toxic"
              text={
                result.investedFactions.length > 0
                  ? `กลุ่มที่รอดจากการขาดน้ำ: ${result.investedFactions.map((f) => ROLE_META[f].label).join(', ')}`
                  : 'ไม่มีกลุ่มใดรวบรวมเสียงลงทุนได้สำเร็จ'
              }
            />
          )}
          
          {(result.wasCrisis || state.martialLawActive) && (
            <SummaryLine
              tone="alert"
              text={
                state.martialLawActive
                  ? 'กฎอัยการศึกส่งผลแล้ว ใครรอดใครร่วง ดูได้จากมิเตอร์วิกฤต!'
                  : result.cutFaction
                    ? result.crisisIncreased
                      ? `วิกฤต! นายกเทศมนตรีตัดน้ำของ ${ROLE_META[result.cutFaction].label} — ระดับวิกฤตของพวกเขาพุ่งสูงขึ้น!`
                      : `วิกฤต! นายกฯ เล็งตัดน้ำ ${ROLE_META[result.cutFaction].label} แต่พวกเขาลงทุนคุ้มกันตัวเองไว้ได้!`
                    : 'เกิดวิกฤตน้ำไม่พอ! แต่ไม่มีการตัดน้ำเกิดขึ้น'
              }
            />
          )}
        </div>
      )}

      <div className="grid w-full gap-3 sm:grid-cols-3">
        {FACTIONS.map((faction) => (
          <FactionCrisis
            key={faction}
            faction={faction}
            crisis={state.factions[faction].crisis}
            count={state.players.filter((p) => p.role === faction).length}
            highlight={
              result?.cutFaction === faction
                ? 'cut'
                : result?.investedFactions.includes(faction)
                  ? 'immune'
                  : null
            }
          />
        ))}
      </div>

      <Button
        size="lg"
        onClick={onContinue}
        className="gap-2 rounded-xl bg-water text-base font-semibold text-water-foreground hover:bg-water/90 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-transform hover:scale-105"
      >
        {isLast ? 'เปิดเผยชะตากรรมของเมือง' : 'เริ่มรอบถัดไป'}
        <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}

function SummaryLine({ tone, text, icon }: { tone: 'neutral' | 'toxic' | 'alert'; text: string; icon?: any }) {
  const Icon = icon ?? (tone === 'alert' ? Skull : tone === 'toxic' ? ShieldCheck : Trophy)
  return (
    <div
      className={cn(
        'flex animate-float-up items-center gap-3 rounded-xl border bg-card/60 px-4 py-3 shadow-lg',
        tone === 'alert' && 'border-alert/40 text-glow-alert bg-alert/5',
        tone === 'toxic' && 'border-toxic/40 text-glow-toxic bg-toxic/5',
        tone === 'neutral' && 'border-border/60 bg-white/5',
      )}
    >
      <Icon
        className={cn(
          'size-5 shrink-0',
          tone === 'alert' && 'text-alert',
          tone === 'toxic' && 'text-toxic',
          tone === 'neutral' && 'text-water',
        )}
      />
      <p className="text-pretty text-sm sm:text-base font-medium">{text}</p>
    </div>
  )
}

export function HostEndgame({
  state,
  onPlayAgain,
}: {
  state: GameState
  onPlayAgain: () => void
}) {
  const victory = state.phase === 'victory'
  const fallen = collapsedFactions(state)

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 px-6 py-12 text-center">
      <div
        className={cn(
          'grid size-24 animate-pulse-ring place-items-center rounded-full border-2',
          victory ? 'border-toxic/60 bg-toxic/10 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'border-alert/60 bg-alert/10 shadow-[0_0_30px_rgba(239,68,68,0.3)]',
        )}
      >
        {victory ? (
          <Trophy className="size-12 text-toxic" />
        ) : (
          <Skull className="size-12 text-alert" />
        )}
      </div>

      <div className="space-y-3">
        <h2
          className={cn(
            'font-display text-5xl font-black text-balance sm:text-6xl',
            victory ? 'text-toxic text-glow-toxic' : 'text-alert text-glow-alert',
          )}
        >
          {victory ? 'เมืองนี้รอดพ้นวิกฤต' : 'เมืองนี้ล่มสลาย'}
        </h2>
        <p className="mx-auto max-w-lg text-pretty text-lg text-muted-foreground font-medium">
          {victory
            ? `${state.maxRounds} รอบแห่งความแห้งแล้งผ่านพ้นไป น้ำเหลือ ${state.waterTokens} หยด หยดสุดท้ายถูกแบ่งปัน ทุกกลุ่มรอดชีวิต`
            : `${fallen.map((f) => ROLE_META[f].label).join(' และ ')} ทนไม่ไหวอีกต่อไป ขาดน้ำจนถึงขีดสุด เมืองลุกเป็นไฟและล่มสลายในที่สุด`}
        </p>
      </div>

      <div className="grid w-full max-w-xl gap-3 sm:grid-cols-3">
        {FACTIONS.map((faction) => (
          <FactionCrisis
            key={faction}
            faction={faction}
            crisis={state.factions[faction].crisis}
            count={state.players.filter((p) => p.role === faction).length}
          />
        ))}
      </div>

      <Button
        size="lg"
        onClick={onPlayAgain}
        className="rounded-xl bg-water text-base font-semibold text-water-foreground hover:bg-water/90 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-transform hover:scale-105 mt-6"
      >
        เล่นอีกครั้ง
      </Button>
    </div>
  )
}
