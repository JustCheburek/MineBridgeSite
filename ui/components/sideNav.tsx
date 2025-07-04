'use client'

// React
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import { useState } from 'react'
import Link, { type LinkProps } from 'next/link'
import { cn } from '@/lib/utils'

// Компоненты
import { NavLink } from '@components/navlink'
import { Burger } from '@components/burger'

export function Subsections({ children, menu }: PropsWithChildren<{ menu: string }>) {
  const [burger, setBurger] = useState(false)

  function closeBurger() {
    setBurger(false)
  }

  return (
    <nav
      className={cn(
        'max-lg:borderbox max-lg:fixed max-lg:bottom-[-1px] max-lg:left-0 max-lg:z-20 max-lg:flex max-lg:h-[calc(var(--spacing-header)/1.5)] max-lg:w-full max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:rounded-none max-lg:py-6 max-lg:backdrop-blur-sm',
        { 'max-lg:burger-active': burger }
      )}
    >
      {/* Бургер иконка */}
      <label className='max-lg:flex max-lg:items-center max-lg:justify-center max-lg:gap-8 lg:hidden'>
        <Burger burger={burger} setBurger={setBurger} short />
        <h3>{menu}</h3>
      </label>

      <ul
        className={cn(
          'list-none p-0 lg:sticky lg:top-[calc(var(--spacing-header)*1.4)] lg:w-fit',
          'max-lg:bg-background/80 max-lg:absolute max-lg:inset-0 max-lg:hidden max-lg:h-min max-lg:w-full max-lg:translate-y-[-100%] max-lg:place-content-center max-lg:gap-[clamp(0.1rem,5svh,1.5rem)] max-lg:overflow-y-auto max-lg:p-4',
          { 'max-lg:grid': burger }
        )}
        onClick={closeBurger}
      >
        {children}
      </ul>
    </nav>
  )
}

type SubsectionItem = {
  href: string
  className?: string
  exact?: boolean
}

export const SubsectionItem = ({
  children,
  href,
  className = '',
  exact = true,
}: PropsWithChildren<SubsectionItem>) => (
  <li className='max-lg:text-h2 max-lg:leading-h2 group my-[0.45rem] font-medium transition-all duration-500'>
    <NavLink
      href={href}
      exact={exact}
      className={cn(
        'rounded-base group-hover:bg-gray flex px-5 py-[5px] transition duration-500',
        className
      )}
    >
      {children}
    </NavLink>
  </li>
)

export const OnThisPage = ({ children }: PropsWithChildren) => (
  <nav className='max-lg:hidden'>
    <ul className='ml-auto p-0 lg:sticky lg:top-[calc(var(--spacing-header)*1.4)] lg:w-fit'>
      {children}
    </ul>
  </nav>
)

export const OnThisPageHeading = ({ children }: PropsWithChildren) => (
  <li className='my-[0.45rem]'>
    <h3 className='text-unic rounded-base flex px-5 py-[5px]'>{children}</h3>
  </li>
)

export const OnThisPageLink = ({ children, ...props }: PropsWithChildren<LinkProps>) => (
  <li className='group my-[0.45rem]'>
    <Link
      className='group-hover:bg-gray rounded-base flex gap-2 px-5 py-[5px] transition duration-500'
      {...props}
    >
      {children}
    </Link>
  </li>
)

export const OnThisPageButton = ({
  children,
  ...props
}: PropsWithChildren<ComponentPropsWithoutRef<'button'>>) => (
  <li className='group my-[0.45rem]'>
    <button
      className='group-hover:bg-gray rounded-base flex px-5 py-[5px] transition duration-500'
      {...props}
    >
      {children}
    </button>
  </li>
)

export const OnThisPageBox = ({ children }: PropsWithChildren) => (
  <li>
    <ul className='ml-auto list-none'>{children}</ul>
  </li>
)
