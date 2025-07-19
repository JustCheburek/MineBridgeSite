'use client'

import Link from 'next/link'
import type { User } from 'lucia'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function LinkAccounts({ user }: { user: User }) {
  const [isVisible, setIsVisible] = useState(true)

  // Проверяем, есть ли у пользователя ID Twitch, но нет URL Twitch
  // Это значит, что аккаунт был привязан, но URL не был добавлен
  const showTwitchAgain = user.twitchId && !user.urls?.twitch
  
  // Показываем обычную кнопку привязки Twitch, если у пользователя нет ID Twitch
  // и не нужно показывать кнопку повторной привязки
  const showTwitch = !user.twitchId && !showTwitchAgain
  
  // Показываем кнопку привязки Discord только если не нужно показывать кнопки Twitch
  // и у пользователя еще нет привязанного Discord аккаунта
  const showDiscord = !showTwitch && !user.discordId

  // Не показываем компонент, если он скрыт или нет кнопок для отображения
  if (!isVisible || (!showTwitch && !showDiscord && !showTwitchAgain)) return null

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

      {/* Кнопка первичной привязки Twitch */}
      {showTwitch && (
        <Link href={`/auth/twitch?name=${user.name}`}>
          <small>
            Привяжите <span className='text-twitch font-medium'>Twitch</span>, чтобы получать
            подарки от стримеров
          </small>
        </Link>
      )}
      
      {/* Кнопка повторной привязки Twitch (когда ID есть, но URL отсутствует) */}
      {showTwitchAgain && (
        <Link href={`/auth/twitch?name=${user.name}`}>
          <small>
            Привяжите <span className='text-twitch font-medium'>Twitch</span> <span className='text-unic font-medium'>снова</span>, чтобы получать
            подарки от стримеров
          </small>
        </Link>
      )}
      
      {/* Кнопка привязки Discord */}
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
