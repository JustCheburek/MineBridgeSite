'use client'

import Link from 'next/link'
import type { User } from 'lucia'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function LinkAccounts({ user }: { user: User }) {
  const [isVisible, setIsVisible] = useState(true)

  // Определяем, что показывать
  const showTwitch = !user.twitchId
  const showDiscord = !showTwitch && !user.discordId

  if (!isVisible || (!showTwitch && !showDiscord)) return null

  return (
    <div
      className={cn(
        'card w-full px-5 py-3',
        'flex items-center justify-around gap-3 transition-all duration-300',
        'group shadow-[0_0_15px_rgba(76,74,82,0.3)]',
        'has-[button:active]:opacity-0'
      )}
    >
      <p className='border-info-border rounded-base bg-info-bg flex size-[1.5em] items-center justify-center border font-medium'>
        i
      </p>

      {showTwitch && (
        <Link href={`/auth/twitch?name=${user.name}`}>
          <small>
            Привяжите <span className='text-twitch font-medium'>Twitch</span>, чтобы получать
            подарки от стримеров
          </small>
        </Link>
      )}
      {showDiscord && (
        <Link href={`/auth/discord?name=${user.name}`}>
          <small>
            Привяжите <span className='text-ds font-medium'>Discord</span>, чтобы получить роли
          </small>
        </Link>
      )}
      <button
        onClick={() => {
          setIsVisible(false)
        }}
        className='border-info-border rounded-base bg-info-bg active:text-text flex size-[1.5em] items-center justify-center border font-medium'
        aria-label='Закрыть уведомление'
      >
        ✕
      </button>
    </div>
  )
}
