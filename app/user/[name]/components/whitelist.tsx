// React
import type { User } from 'lucia'

// Стили
import Link from 'next/link'

export default function WhitelistSection({ user, isMe }: { user: User; isMe: boolean }) {
  if (user.rating <= -200) {
    return (
      <section className='text-center'>
        <h3>{isMe ? 'Ты в бане' : 'Игрок в бане'}</h3>
      </section>
    )
  }

  if (!isMe) {
    if (!user.days || user.days <= 0) {
      return (
        <section className='text-center'>
          <h3 className='text-red'>
            Игрок не купил{' '}
            <Link href='/shop#pass' className='text-unic'>
              проходку
            </Link>
          </h3>
        </section>
      )
    }

    return (
      <section className='text-center'>
        <h3>
          Игрок купил{' '}
          <Link href='/shop#pass' className='text-unic'>
            проходку
          </Link>
        </h3>
      </section>
    )
  }

  if (!user.days || user.days <= 0) {
    return (
      <section className='text-center'>
        <h3>
          Купите{' '}
          <Link href='/shop#pass' className='text-unic'>
            проходку
          </Link>
          , чтобы играть на сервере
        </h3>
      </section>
    )
  }

  return (
    <section className="grid place-items-center text-center">
      <h2>8 сезон</h2>
      <h4 className='font-medium'>{process.env.NEXT_PUBLIC_VERSION} Java Edition</h4>
      <p>
        IP:{' '}
        <code className='text-unic font-bold'>
          secure.{process.env.NEXT_PUBLIC_EN_DOMAIN}
        </code>
      </p>
      <p>
        Ещё <span className='text-green font-medium'>{user.days ?? 0}</span> дн. проходки
      </p>
    </section>
  )
}
