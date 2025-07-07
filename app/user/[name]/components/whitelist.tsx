// React
import type { User } from 'lucia'

// Стили
import Link from 'next/link'

export default function WhitelistSection({ user, isMe }: { user: User; isMe: boolean }) {
  if (user.rating <= -200) {
    return (
      <section className='text-center'>
        <h2>{isMe ? 'Ты в бане' : 'Игрок в бане'}</h2>
      </section>
    )
  }

  if (!isMe) {
    if (!user.whitelist) {
      return (
        <section className='text-center'>
          <h2 className='text-red'>
            Игрок не купил{' '}
            <Link href='/shop' className='text-unic'>
              проходку
            </Link>
          </h2>
        </section>
      )
    }

    return (
      <section className='text-center'>
        <h2>
          Игрок купил{' '}
          <Link href='/shop' className='text-unic'>
            проходку
          </Link>
        </h2>
      </section>
    )
  }

  if (!user.whitelist) {
    return (
      <section className='text-center'>
        <h2>
          Купите{' '}
          <Link href='/shop' className='text-unic'>
            проходку
          </Link>
          , чтобы играть на сервере
        </h2>
      </section>
    )
  }

  return (
    <section className="grid place-items-center text-center">
      <h2>Межсезонье</h2>
      <h4 className='text-unic font-medium'>{process.env.NEXT_PUBLIC_VERSION} Java Edition</h4>
      <p>
        IP:{' '}
        <code className='text-unic font-bold'>
          secure.{process.env.NEXT_PUBLIC_EN_DOMAIN}
        </code>
      </p>
      <small>
        Если просит авторизацию, то
        <br />
        перезагрузите страницу
      </small>
    </section>
  )
}
