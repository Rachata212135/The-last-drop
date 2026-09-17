import { getSupabase } from './supabase/client'

export type RealtimeHandler = (event: string, payload: unknown) => void
export type Transport = 'supabase' | 'broadcast'

export interface Room {
  transport: Transport
  send: (event: string, payload: unknown) => void
  close: () => void
}

type Envelope = { e: string; p: unknown }

/**
 * Joins a realtime room identified by a game PIN.
 *
 * Uses Supabase Realtime broadcast when public keys are configured so that
 * host and players sync instantly across different devices. Falls back to a
 * same-origin BroadcastChannel (works across tabs/windows in one browser)
 * when keys are missing, which keeps local development functional.
 *
 * All app messages are sent under a single broadcast event ("msg") and the
 * real event name is carried inside the payload envelope.
 */
export function joinRoom(
  pin: string,
  onEvent: RealtimeHandler,
  onReady?: () => void,
): Room {
  const topic = `lastdrop:${pin}`
  const supabase = getSupabase()

  if (supabase) {
    const channel = supabase.channel(topic, {
      config: { broadcast: { self: false, ack: false } },
    })

    channel.on('broadcast', { event: 'msg' }, (message) => {
      const body = message.payload as Envelope
      if (body && typeof body.e === 'string') onEvent(body.e, body.p)
    })

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') onReady?.()
    })

    return {
      transport: 'supabase',
      send: (event, payload) => {
        void channel.send({
          type: 'broadcast',
          event: 'msg',
          payload: { e: event, p: payload } satisfies Envelope,
        })
      },
      close: () => {
        void supabase.removeChannel(channel)
      },
    }
  }

  // Fallback: BroadcastChannel (same browser, multiple tabs/windows).
  const bc = new BroadcastChannel(topic)
  bc.onmessage = (ev: MessageEvent<Envelope>) => {
    const body = ev.data
    if (body && typeof body.e === 'string') onEvent(body.e, body.p)
  }
  // Ready on next tick so callers can attach state first.
  setTimeout(() => onReady?.(), 0)

  return {
    transport: 'broadcast',
    send: (event, payload) => bc.postMessage({ e: event, p: payload } satisfies Envelope),
    close: () => bc.close(),
  }
}
