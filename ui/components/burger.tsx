import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from 'react'
import { cn } from '@/lib/utils'

type Burger = {
  burger: boolean
  setBurger?: Dispatch<SetStateAction<boolean>>
  short?: boolean
}

export function Burger({
  burger,
  setBurger,
  short = false,
  className,
  ...props
}: Burger & ComponentPropsWithoutRef<'span'>) {
  return (
    <button
      className={cn(
        'flex h-[38px] w-[38px] flex-col items-start justify-evenly min-[1200px]:hidden',
        className
      )}
      onClick={() => setBurger && setBurger((prev: boolean) => !prev)}
      name='burger_icon'
      {...props}
    >
      <div
        className={cn('bg-unic rounded-base h-[5px] w-full transition-all duration-300', {
          'translate-y-[11px] rotate-45': burger,
        })}
      />
      <div
        className={cn('bg-unic rounded-base h-[5px] w-full transition-all duration-300', {
          'opacity-0': burger,
        })}
      />
      <div
        className={cn('bg-unic rounded-base h-[5px] transition-all duration-300', {
          'w-full translate-y-[-11px] -rotate-45': burger,
          'w-3/4': short && !burger,
          'w-full': !short || burger,
        })}
      />
    </button>
  )
}
