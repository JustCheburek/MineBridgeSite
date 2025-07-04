'use client'

import { usePathname } from 'next/navigation'
import Link, { type LinkProps } from 'next/link'
import type { PropsWithChildren } from 'react'
import type { DangerProps } from './form'
import { cn } from '@/lib/utils'

export type NavLink = {
  href: string
  activeClassName?: string
  className?: string
  exact?: boolean
} & LinkProps &
  PropsWithChildren &
  DangerProps

export function NavLink({
  href,
  children,
  activeClassName = 'text-unic',
  className = '',
  exact = false,
  danger = false,
  ...props
}: NavLink) {
  const pathname = usePathname()
  if (href === '/') {
    exact = true
  }
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={cn(
        {
          'text-red': danger,
          [activeClassName]: isActive,
        },
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
