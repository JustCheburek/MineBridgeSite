import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import Link from 'next/link'
import { MostikiSvg } from '@ui/SVGS'
import { cn } from '@/lib/utils'

type Section = ComponentPropsWithoutRef<'div'>
export const Section = ({ children, ...props }: Section) => {
  return (
    <div
      className={cn(
        'relative grid place-content-center gap-8 text-center sm:grid-cols-2 sm:gap-x-16 xl:grid-cols-3'
      )}
      {...props}
    >
      {children}
    </div>
  )
}

type Heading = ComponentPropsWithoutRef<'div'>
export const Heading = ({ children, className, ...props }: Heading) => (
  <div className={cn('my-8 grid place-items-center', className)} {...props}>
    {children}
  </div>
)

type Author = {
  description: string
  href: string
} & ComponentPropsWithoutRef<'div'>
export const Author = ({ description, href, children, ...props }: Author) => (
  <div className='my-8 grid place-items-center text-center' {...props}>
    <Link href={href} target='_blank'>
      <h3 className='font-mono'>{children}</h3>
      <small>{description}</small>
    </Link>
  </div>
)

type Box = ComponentPropsWithoutRef<'div'> & {
  span2?: boolean
  preview?: boolean // первый
  casebox?: boolean // последний
}
export const Box = ({
  children,
  span2 = false,
  preview = false,
  casebox = false,
  className = '',
  ...props
}: Box) => (
  <div
    className={cn(
      'grid items-center justify-center gap-8',
      {
        'sm:max-xl:col-span-2 sm:max-xl:mx-auto': span2 || preview || casebox,
        'xl:col-start-2 xl:row-start-1': preview,
        'sm:max-xl:grid-cols-2': casebox,
      },
      className
    )}
    {...props}
  >
    {children}
  </div>
)

type Text = ComponentPropsWithoutRef<'div'>
export const Text = ({ children, className = '', ...props }: Text) => (
  <div
    className={cn('borderbox bg-gray/80 m-0 grid w-full place-content-center p-6', className)}
    {...props}
  >
    {children}
  </div>
)

export const Price = ({ children, oldPrice }: PropsWithChildren<{ oldPrice?: number }>) => (
  <div className='relative my-[5px] flex items-center justify-center gap-2'>
    {oldPrice && (
      <p className="text-light-gray before:bg-red absolute -top-[5px] right-[15px] rotate-[25deg] font-medium opacity-[0.68] before:absolute before:-left-[18%] before:top-[40%] before:h-[2px] before:w-[135%] before:rotate-[18deg] before:opacity-[0.68] before:content-['']">
        {oldPrice}
      </p>
    )}

    <h2>{children}</h2>

    <h3 className='my-auto flex items-center'>
      <MostikiSvg />
    </h3>
  </div>
)
