// React
import type { ComponentPropsWithoutRef } from 'react'
import Link, { LinkProps } from 'next/link'
import { cn } from '@/lib/utils'

// Компоненты
import { DangerProps } from '@components/form'
import { NavLink } from './navlink'

// Базовые стили для кнопки
const buttonBaseStyles = {
  container:
    'relative flex justify-center items-center w-fit mx-auto py-[15px] px-[45px] my-[2.5rem] z-10 group/button select-none',
}

export const MiniLink = ({ children, className = '', href, ...props }: NavLink) => {
  return (
    <NavLink
      href={href}
      className={cn(
        'rounded-button w-full px-[17px] py-[9px] transition-colors duration-500',
        'hover:bg-gray active:text-unic focus:text-unic',
        className
      )}
      {...props}
    >
      {children}
    </NavLink>
  )
}

export const MiniA = ({ children, className = '', href, ...props }: ComponentPropsWithoutRef<'a'>) => {
  return (
    <a
      href={href}
      className={cn(
        'rounded-button w-full px-[17px] py-[9px] transition-colors duration-500',
        'hover:bg-gray active:text-unic focus:text-unic',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}

export const BG = ({ className = '', danger = false, disabled = false, ...props }: ComponentPropsWithoutRef<'span'> & DangerProps & { disabled?: boolean }) => {
  return (
    <span
      className={cn(
        'absolute inset-0 rounded-button -z-10 opacity-75 transition-all duration-600 drop-shadow-[0_0_10px]',
        danger ? 'bg-red drop-shadow-red' : 'bg-unic drop-shadow-unic',
        { 'group-hover/button:multi-["scale-115;opacity-100;drop-shadow-[0_0_13px]"]': !disabled },
        'group-active/button:multi-["opacity-50;drop-shadow-[0_0_7px]"]',
        'group-focus/button:opacity-80',
        { 'opacity-50': disabled },
        className
      )}
      {...props}
    />
  )
}

type Url = ComponentPropsWithoutRef<'a'> & LinkProps & DangerProps & { bg?: boolean }

export const Url = ({
  href,
  children,
  target,
  className = '',
  download = false,
  danger = false,
  bg = true,
  ...props
}: Url) => {
  if (!target) {
    if (download || href.toString().startsWith('http')) {
      target = '_blank'
    } else {
      target = '_self'
    }
  }

  return (
    <Link
      href={href}
      target={target}
      className={cn(buttonBaseStyles.container, className)}
      download={download}
      {...props}
    >
      {bg && <BG danger={danger}/>}
      <h3>{children}</h3>
    </Link>
  )
}

export type Button = ComponentPropsWithoutRef<'button'> & DangerProps & { bg?: boolean }

export const Button = ({ children, className = '', danger = false, disabled = false, bg=true, ...props }: Button) => {
  return (
    <button className={cn(buttonBaseStyles.container, className)} disabled={disabled} {...props}>
      {bg && <BG danger={danger} disabled={disabled}/>}
      <h3>{children}</h3>
    </button>
  )
}
