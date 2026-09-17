import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cached: SupabaseClient | null = null
let attempted = false

/**
 * Returns a singleton Supabase client used purely for Realtime broadcast.
 * Returns null when public keys are absent, so callers can fall back to
 * a same-origin BroadcastChannel transport for local testing.
 */
export function getSupabase(): SupabaseClient | null {
  if (attempted) return cached
  attempted = true

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    cached = null
    return null
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    realtime: { params: { eventsPerSecond: 20 } },
  })
  return cached
}
