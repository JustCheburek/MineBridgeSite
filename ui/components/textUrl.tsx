import type { PropsWithChildren } from 'react'
import Link, { type LinkProps } from 'next/link'
import { AutoSvg } from '@ui/SVGS'
import { cn } from '@/lib/utils'

export function TextUrl({ href, children, ...props }: PropsWithChildren<LinkProps>) {
  const hrefStr = href?.toString()
  let type = 'mb'
  if (hrefStr?.startsWith('http')) {
    type = hrefStr?.split('/')[2]?.split('.')[0]
  }

  // Объект для сопоставления типа с соответствующими цветами
  const typeClasses = {
    discord: 'text-ds border-ds',
    t: 'text-tg border-tg',
    twitch: 'text-twitch border-twitch',
    legal: 'text-twitch border-twitch',
    mb: 'text-unic border-unic',
  }

  return (
    <Link
      href={href}
      target='_blank'
      className={cn(
        'inline-flex translate-y-[4.5px] items-center gap-1.5 rounded-[5px] border px-[8px_10px] font-medium',
        'max-lg:mx-[5px] max-lg:mb-1 max-lg:gap-[30px] max-lg:px-2.5',
        typeClasses[type as keyof typeof typeClasses]
      )}
      {...props}
    >
      <AutoSvg type={type} className='size-[1.2em]' colorful />
      {children}
    </Link>
  )
}
