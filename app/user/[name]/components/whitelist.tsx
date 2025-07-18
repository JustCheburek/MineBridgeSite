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
        <p>
          Ещё <span className='text-green font-medium'>{user.days}</span> дн. проходки
        </p>
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
        <p className='text-light-gray opacity-50'>
          Отсчёт дней: {process.env.NEXT_PUBLIC_DAYS === 'on' ? 'ВКЛ' : 'ВЫКЛ'}
        </p>
      </section>
    )
  }

  return (
    <section className='grid place-items-center gap-2 text-center'>
      <h2>8 сезон</h2>
      <div>
        <p>{process.env.NEXT_PUBLIC_VERSION} Java Edition</p>
        <p>
          IP:{' '}
          <code className='text-unic font-bold'>secure.{process.env.NEXT_PUBLIC_EN_DOMAIN}</code>
        </p>
      </div>
      <div>
        <p>
          Ещё <span className='text-green font-medium'>{user.days}</span> дн. проходки
        </p>
        <Link href='/shop#pass' className='text-unic font-medium'>
          Продлить проходку
        </Link>
      </div>

      <p className='text-light-gray opacity-50'>
        Отсчёт дней: {process.env.NEXT_PUBLIC_DAYS === 'on' ? 'ВКЛ' : 'ВЫКЛ'}
      </p>
    </section>
  )
}
