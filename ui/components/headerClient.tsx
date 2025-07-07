'use client'

// React
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import type { User } from 'lucia'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

// Компоненты
import { Urls } from './urls'
import { AuthSvg, MinebridgeSvg, MostikiSvg, StarSvg } from '@ui/SVGS'
import { NavLink } from '@components/navlink'
import { Burger } from '@components/burger'
import { Skeleton } from '@components/skeleton'
import { MiniA, MiniLink } from '@components/button'

const Avatar = dynamic(() => import('@components/avatar'))

type Burger = {
  burger: boolean
  setBurger: any
}

// todo: Анимация появления
const MainNav = ({ burger, setBurger }: Burger) => (
  <nav
    className={cn(
      'lg:grid lg:grid-cols-[3fr_1fr] lg:place-items-center lg:gap-8 xl:gap-14',
      'max-lg:bg-background/80 max-lg:fixed max-lg:inset-0 max-lg:flex max-lg:h-dvh max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:gap-x-8 max-lg:gap-y-2 max-lg:overflow-y-auto',
      {
        'max-lg:flex': burger,
        'max-lg:hidden': !burger,
      }
    )}
    onClick={() => setBurger(false)}
  >
    <ul className='max-lg:text-h2 max-lg:leading-h2 max-lg:borderbox flex items-center justify-between gap-2.5 max-lg:flex-col max-lg:gap-[clamp(0.1rem,1vh,1.5rem)] max-lg:p-6'>
      {/* Основная навигация */}
      <li>
        <MiniLink href='/'>Главная</MiniLink>
      </li>
      <li>
        <MiniLink href='/shop'>Магазин</MiniLink>
      </li>
      <li>
        <MiniLink href='/rules'>Правила</MiniLink>
      </li>
      <li>
        <MiniLink href='/news'>Новости</MiniLink>
      </li>
      <li>
        <MiniLink href='/features'>Фичи</MiniLink>
      </li>
    </ul>

    <Urls className='max-lg:borderbox flex items-center justify-between gap-2.5 max-lg:p-6' />
  </nav>
)

function User({ user }: { user: User | null }) {
  const [isMenu, setIsMenu] = useState(false)

  useEffect(() => {
    document.body.addEventListener('click', () => setIsMenu(false))

    return function cleanUp() {
      document.body.removeEventListener('click', () => setIsMenu(false))
    }
  }, [isMenu])

  if (!user) {
    return (
      <NavLink
        href='/auth'
        className='hover:text-unic active:text-unic flex items-center justify-center gap-2.5'
      >
        <AuthSvg className='size-[38px] lg:size-9' />
        <p className='font-semibold max-lg:hidden'>Войти</p>
      </NavLink>
    )
  }

  return (
    <nav className='relative' onClick={e => e.stopPropagation()}>
      <div className='flex items-center justify-center gap-[17.5px] max-lg:grid-cols-1'>
        <div className='flex flex-col max-xl:hidden'>
          <NavLink href={`/user/${user.name}`} className='user_name font-medium'>
            {user.name}
          </NavLink>

          <small className='flex justify-end gap-2 font-semibold leading-normal'>
            <Link href='/milkyway'>
              <p className='text-yellow flex items-center gap-[2.5px]'>
                {user?.rating || 0} <StarSvg className='size-[0.8em]' />
              </p>
            </Link>

            <Link href='/shop/buy'>
              <p className='text-unic flex items-center gap-[2.5px]'>
                {user?.mostiki || 0} <MostikiSvg className='size-[0.9em]' />
              </p>
            </Link>
          </small>
        </div>

        <button
          className='flex items-center justify-center gap-[17.5px] max-lg:grid-cols-1'
          onClick={() => setIsMenu(true)}
        >
          <Avatar src={user.photo} className='size-[38px]' />
        </button>
      </div>

      <nav
        className={cn(
          'borderbox rounded-tr-1 absolute right-0 rounded-tr-md p-[15px]',
          {
            block: isMenu,
            hidden: !isMenu,
          }
        )}
      >
        <ul>
          <li>
            <MiniLink href={`/user/${user.name}`}>Профиль</MiniLink>
          </li>
          <li>
            <MiniLink href='/milkyway'>Мл. путь</MiniLink>
          </li>
          <li>
            <MiniLink href='/users'>Игроки</MiniLink>
          </li>
          <li>
            <MiniLink href='https://discord.gg/UBB92NjedW'>Кланы</MiniLink>
          </li>
          <li>
            <MiniA href='/api/logout' className='text-red'>
              Выйти
            </MiniA>
          </li>
        </ul>
      </nav>
    </nav>
  )
}

export function HeaderClient({ user }: { user: User | null }) {
  const [burger, setBurger] = useState<boolean>(false)

  useEffect(() => {
    if (burger) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = ''
    }
  }, [burger])

  return (
    <header
      className={cn(
        'min-h-header borderbox sticky top-0 z-40 flex items-center justify-center rounded-none border-none backdrop-blur-md',
        {
          burger_active: burger,
        }
      )}
    >
      <div className='container mx-auto grid w-full grid-cols-3 place-items-center gap-[35px] font-medium lg:grid-cols-[1fr_5fr_1fr]'>
        {/* Бургер иконка */}
        <div className='max-lg:block lg:hidden'>
          <Burger burger={burger} setBurger={setBurger} />
        </div>

        {/* Лого */}
        <Link
          href='/'
          className='h-[38px] w-[38px]'
          rel='shortcut icon'
          aria-label='Переход на главную страницу'
        >
          <MinebridgeSvg className='size-full' />
        </Link>

        {/* Навигация */}
        <MainNav burger={burger} setBurger={setBurger} />

        <Suspense fallback={<Skeleton className='h-[40px] w-[180px]' />}>
          <User user={user} />
        </Suspense>
      </div>
    </header>
  )
}
