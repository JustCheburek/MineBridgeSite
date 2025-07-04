import type { StateWithoutData } from '@/types/state'

export function ErrorMessage({ state }: { state: StateWithoutData }) {
  if (state.success) return null

  return <p className='text-red'>{state.error}</p>
}
