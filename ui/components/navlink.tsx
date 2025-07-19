'use client'

import { usePathname } from 'next/navigation'
import Link, { type LinkProps } from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export type NavLink = {
  activeClassName?: string
  exact?: boolean
} & LinkProps &
  ComponentPropsWithoutRef<'a'>

export function NavLink({
  href,
  children,
  activeClassName = 'text-unic',
  className = '',
  exact = false,
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
