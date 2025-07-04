// React
import type { ImageProps } from 'next/image'
import Image from 'next/image'
import type { ComponentPropsWithoutRef } from 'react'

// Стили
import { cn } from '@/lib/utils'

export type ImgBox = {
  className?: string
  type?: 'post' | 'grid' | undefined
  hover?: boolean
  helper?: boolean
} & ComponentPropsWithoutRef<'figure'>
export const ImgBox = ({
  className = '',
  type,
  children,
  hover = false,
  helper = false,
  ...props
}: ImgBox) => {
  if (type === 'post') {
    hover = true
  }

  // Проверка на rounded-base
  const isRounded = className.includes('rounded')

  return (
    <figure
      className={cn(
        'translate-0 rounded-base relative flex rotate-0 scale-100 items-center justify-center transition-all duration-500 ease-in-out',
        {
          'relative aspect-video overflow-hidden': type === 'post',
          'rounded-b-none': !isRounded && type === 'post',
          'absolute aspect-square w-1/2': type === 'grid',
          'cursor-pointer': helper,
          'hover:[&>img]:scale-110': hover,
        },
        className
      )}
      {...props}
    >
      {children}
      {helper && <p className='helper'>?</p>}
    </figure>
  )
}

export const Img = ({
  src,
  alt,
  className = '',
  pixel = false,
  width,
  height,
  fill,
  ...props
}: { pixel?: boolean } & ImageProps) => (
  <Image
    className={cn(
      'translate-0 rotate-0 scale-100 transition-all duration-500 ease-in-out',
      {
        'object-cover': fill,
        pixel: pixel,
      },
      className
    )}
    fill={(!width && !height) || fill}
    width={width ?? height}
    height={height ?? width}
    src={src}
    alt={alt}
    loading='lazy'
    {...props}
  />
)

export const Totem = ({ src, alt, className = '', ...props }: ComponentPropsWithoutRef<'img'>) => {
  return (
    <img
      src={src}
      alt={alt}
      width={160}
      className={cn(
        'translate-0 pixel rotate-0 scale-100 transition-all duration-500 ease-in-out',
        className
      )}
      {...props}
    />
  )
}
