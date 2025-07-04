import { Typing } from './typing'
import { Url } from '@components/button'
import { getUsersL } from '@services/user'
import { Skeleton } from '@components/skeleton'
import { Suspense } from 'react'

async function AllUsers() {
  const usersL = await getUsersL()

  return (
    <div className='mt-8 leading-[0.3]'>
      <small className='text-light-gray'>
        Нас уже <Suspense fallback={<Skeleton className='h-[1em] w-[3em]' />}>{usersL}</Suspense>,
        присоединяйся и ты,
        <br />
        Стань участником истории или же создай свою
      </small>
    </div>
  )
}

const InfoSection = () => (
  <section className='mt-[75px] text-center'>
    <article className='max-[1200px]:hidden'>
      <h1 className='text-text mx-auto h-[150px] w-full max-w-[1020px]'>
        <span className='text-unic'>MineBridge</span>
        <Typing />
      </h1>

      <Url href='/auth'>Влететь на сервер</Url>

      <p>{process.env.NEXT_PUBLIC_VERSION} · Minecraft: Java Edition · Лицензия не обязательна</p>

      <AllUsers />
    </article>
    <article className='hidden max-[1200px]:block'>
      <h1 className='max-[370px]:hidden'>MineBridge</h1>
      <h1 className='hidden max-[370px]:block'>
        Mine
        <br />
        Bridge
      </h1>

      <p>
        Самый крутой майнкрафт сервер
        <br />
        без приватов и команд
      </p>

      <Url href='/auth'>Влететь на сервер</Url>

      <p>{process.env.NEXT_PUBLIC_VERSION}</p>
      <p>Minecraft: Java Edition</p>
      <p>Лицензия не обязательна</p>

      <AllUsers />
    </article>
  </section>
)

export default InfoSection
