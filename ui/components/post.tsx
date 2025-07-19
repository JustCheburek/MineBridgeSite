// React
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type PTitle = {
  className?: string
  startAt?: Date
  endAt?: Date
}

export const PBox = ({
  children,
  className = '',
  ...props
}: PropsWithChildren<{ className?: string } & ComponentPropsWithoutRef<'div'>>) => (
  <div
    className={cn(
      'rounded-base border-border mx-auto my-16 flex w-[min(750px,100%)] flex-col justify-center overflow-hidden border border-solid',
      className
    )}
    {...props}
  >
    {children}
  </div>
)

export const PTitle = ({ children, className = '' }: PropsWithChildren<PTitle>) => (
  <div className={cn('my-8 text-center', className)}>{children}</div>
)

export const PText = ({
  children,
  className = '',
}: PropsWithChildren<{
  className?: string
}>) => (
  <div className={cn('mx-auto mb-8 grid max-w-[29rem] place-content-center px-6', className)}>
    {children}
  </div>
)

type SeasonBox = {
  number: number
  startAt: Date
  endAt: Date
  link?: string
}

export const SeasonBox = ({ number, startAt, endAt, link }: SeasonBox) => (
  <div className='relative flex items-center justify-around gap-[0.5em]' id={`${number}season`}>
    <div className='md:text-green hidden md:grid md:grid-rows-2 md:justify-between md:justify-items-start'>
      <div className='md:h-[2.7em] md:w-[2.7em]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          className='bi bi-flag'
          viewBox='0 0 16 16'
        >
          <path d='M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z' />
        </svg>
      </div>
      <time className='md:py-[0.5em]' dateTime={startAt.toISOString()}>
        <strong>
          {startAt.toLocaleDateString('ru-RU', {
            timeZone: 'Asia/Vladivostok',
          })}
        </strong>
      </time>
    </div>
    <h2 className="text-unic rounded-base border-border bg-background before:bg-border relative border-2 border-solid px-12 py-4 text-center before:absolute before:left-0 before:top-1/2 before:z-[-1] before:h-[2px] before:w-full before:content-['']">
      {link ? (
        <Link href={link} target='_blank' className='text-unic'>
          {number} сезон
        </Link>
      ) : (
        <>{number} сезон</>
      )}
    </h2>
    <div className='md:text-red hidden md:grid md:grid-rows-2 md:justify-between md:justify-items-end'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        className='md:h-[2.7em] md:w-[2.7em] md:scale-x-[-1]'
        viewBox='0 0 16 16'
      >
        <path d='M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001' />
      </svg>
      <time className='md:py-[0.5em]' dateTime={endAt.toISOString()}>
        <strong>
          {endAt.toLocaleDateString('ru-RU', {
            timeZone: 'Asia/Vladivostok',
          })}
        </strong>
      </time>
    </div>
  </div>
)

type PTags = {
  className?: string
  tags: string[]
} & ComponentPropsWithoutRef<'div'>

export const PTags = ({ children, className = '', ...props }: PTags) => (
  <div className={cn('my-4 flex flex-wrap gap-[0.3rem]', className)} {...props}>
    {children}
  </div>
)

type PTag = {
  className?: string
} & ComponentPropsWithoutRef<'small'>

export const PTag = ({ children, className = '', ...props }: PTag) => (
  <small
    className={cn(
      'text-unic border-border bg-unic/10 rounded-[0.7rem] border border-solid px-[0.5em] py-[0.2em]',
      className
    )}
    {...props}
  >
    {children}
  </small>
)
