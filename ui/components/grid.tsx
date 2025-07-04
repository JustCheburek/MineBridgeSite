// React
import Link, { LinkProps } from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

// Утилиты
import { cn } from '@/lib/utils'

// Компоненты
import { AnotherSiteSvg } from '@ui/SVGS'
import { ImgBox } from '@components/img'

type GContainer = {
  border?: boolean
} & ComponentPropsWithoutRef<'div'>

export const GContainer = ({ children, className = '', border = false, ...props }: GContainer) => (
  <div
    className={cn(
      'relative grid place-content-center gap-x-8 gap-y-20 *:h-60 *:w-72',
      'grid-cols-autofit-72',
      {
        '*:border-border *:rounded-base *:bg-background/80 *:border *:border-solid': border,
      },
      className
    )}
    {...props}
  >
    {children}
  </div>
)

type AnotherSite = { anotherSite?: boolean }
export const AnotherSite = ({ className = '', ...props }: ComponentPropsWithoutRef<'svg'>) => (
  <AnotherSiteSvg
    className={cn('text-p hover:text-unic absolute right-[10px] top-[10px] transition-colors duration-300', className)}
    {...props}
  />
)

type GBox = AnotherSite & ComponentPropsWithoutRef<'div'>
export const GBox = ({ children, className = '', anotherSite = false, ...props }: GBox) => (
  <div className={cn('group/grid relative mx-auto flex flex-wrap items-center justify-center', className)} {...props}>
    {children}
    {anotherSite && <AnotherSite />}
  </div>
)

type GLink = AnotherSite & LinkProps & ComponentPropsWithoutRef<'a'>
export const GLink = ({
  children,
  href,
  anotherSite = false,
  className = '',
  ...props
}: GLink) => {
  return (
    <Link
      href={href}
      target={href.toString().startsWith('http') ? '_blank' : '_self'}
      className={cn(
        'group/grid relative mx-auto flex flex-wrap items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
      {anotherSite && <AnotherSite />}
    </Link>
  )
}

type GText = {
  center?: boolean
} & ComponentPropsWithoutRef<'h3'>
export const GText = ({ children, center = false, className, ...props }: GText) => (
  <h3
    className={cn(
      'absolute z-20 text-center',
      {
        'bottom-[25px] translate-y-[25%]': !center,
      },
      className
    )}
    {...props}
  >
    {children}
  </h3>
)

type GImg = {
  imgs?: 'one' | 'two' | 'three'
} & ImgBox

export const GImg = ({ children, className, imgs, ...props }: GImg) => (
  <ImgBox
    type='grid'
    className={cn(
      {
        'w-[70%] -translate-y-4 group-hover/grid:multi-["scale-115;rotate-6;-translate-y-6"]': 
          imgs === 'one',
        '-translate-y-3 first:multi-["-translate-x-17;-rotate-12;z-10"] nth-[2]:multi-["translate-x-17;rotate-12;z-20"]':
          imgs === 'two',
        'group-hover/grid:multi-["first:-translate-x-20;first:-rotate-17;nth-[2]:translate-x-20;nth-[2]:rotate-17;-translate-y-4"]':
          imgs === 'two',
        'first:multi-["-translate-x-16;-rotate-18;z-10"] nth-[2]:multi-["-translate-y-5.5;z-20"] nth-3:multi-["translate-x-16;rotate-18;z-10"]':
          imgs === 'three',
        'group-hover/grid:multi-["first:-translate-x-25;first:-rotate-25;nth-[2]:-translate-y-12;nth-3:translate-x-25;nth-3:rotate-25"]':
          imgs === 'three'
      },
      className
    )}
    {...props}
  >
    {children}
  </ImgBox>
)

/*
export const GHint = ({children, className, ...props}: ComponentPropsWithoutRef<"h4">) => (
    <h4 className={cn("absolute rotate-[10deg] top-[12px] right-[10px] z-[var(--2z)]", className)} {...props}>
        <strong>
            {children}
        </strong>
    </h4>
)*/
