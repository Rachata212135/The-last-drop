import { PlayerGame } from '@/components/player/player-game'

export const metadata = {
  title: 'Join — The Last Drop',
}

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ pin?: string }>
}) {
  const { pin } = await searchParams
  const initialPin = (pin ?? '').replace(/\D/g, '').slice(0, 4)
  return <PlayerGame initialPin={initialPin} />
}
