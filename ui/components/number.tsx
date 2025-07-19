'use client'

import { LinkSvg } from '@ui/SVGS'
import { ComponentPropsWithoutRef } from 'react'
import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type LinkNumber = {
  box?: boolean
} & ComponentPropsWithoutRef<'a'> &
  LinkProps
export const LinkNumber = ({ href, box = true, children, className, ...props }: LinkNumber) => {
  const path = usePathname()
  const url = new URL(`${path}#${href}`, process.env.NEXT_PUBLIC_EN_URL!).toString()

  return (
    <Link
      href={`#${href}`}
      className={cn(
        'group relative flex items-center justify-center overflow-hidden',
        '*:duration-800 *:absolute *:size-full *:transition-all *:active:delay-0 *:active:duration-300',
        box
          ? 'aspect-square w-8 rounded-[10px] bg-[rgba(63,63,70,0.5)]'
          : 'aspect-square w-[1.8em]',
        className
      )}
      onClick={() => navigator.clipboard.writeText(url)}
      {...props}
    >
      <LinkSvg
        className={cn(
          'active:text-unic scale-75',
          box
            ? "-translate-x-[105%] group-hover:multi-['translate-x-0;delay-0;rotate-145']"
            : "-translate-y-[10%] translate-x-[105%] -rotate-45 opacity-0 group-hover:translate-x-0 group-hover:multi-['-translate-y-[10%];delay-0;rotate-145;opacity-100']"
        )}
      />
      <p
        className={cn(
          'text-center',
          box
            ? "font-medium group-hover:multi-['delay-300;translate-x-[105%];rotate-145']"
            : "group-hover:multi-['-translate-x-[105%];opacity-0']"
        )}
      >
        {children}
      </p>
    </Link>
  )
}

type Number = {
  box?: boolean
} & ComponentPropsWithoutRef<'span'>
export const Number = ({ children, className, box = true, ...props }: Number) => (
  <span
    className={cn(
      'relative flex items-center justify-center overflow-hidden',
      box ? 'aspect-square w-8 rounded-[10px] bg-[rgba(63,63,70,0.5)]' : 'aspect-square w-[1.8em]',
      className
    )}
    {...props}
  >
    {children}
  </span>
)

export const SNumber = ({ children, className, ...props }: ComponentPropsWithoutRef<'span'>) => (
  <span
    className={cn(
      'relative flex aspect-square w-8 items-center justify-center rounded-[10px] bg-[rgba(63,63,70,0.5)]',
      className
    )}
    {...props}
  >
    {children}
  </span>
)
