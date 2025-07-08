// React
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type MaxSize = {
  sideNav?: boolean
}

export function MaxSize({
  children,
  sideNav = false,
  className = '',
  ...props
}: ComponentPropsWithoutRef<'div'> & MaxSize) {
  return (
    <div
      className={cn(
        'py-(--spacing-page) max-md:px-3 container relative mx-auto',
        sideNav && 'grid lg:grid-cols-[1fr_4fr_1fr] lg:gap-12',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
