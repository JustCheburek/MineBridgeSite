import { ReloadButton } from '@components/reload'
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import { UpSvg } from '@ui/SVGS'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface RelativePath {
  name: string
  displayname: string
  hide?: boolean
}

const RelativeNav = ({ paths }: { paths: RelativePath[] }) => (
  <nav className='text-center'>
    {paths.map((path, index) => {
      if (path.hide) {
        return null
      }
      const current = index + 1
      const last = current === paths.length

      if (last) {
        return <span key={index}>{path.displayname}</span>
      }

      const absolutePath = `/${paths
        .slice(0, current)
        .map(p => p.name)
        .join('/')}`

      return (
        <span key={index}>
          <Link href={absolutePath}>{path.displayname}</Link>
          <span className='text-light-gray'> {'>'} </span>
        </span>
      )
    })}
  </nav>
)

interface H1Props extends ComponentPropsWithoutRef<'h1'> {
  reload?: () => void
  up?: boolean
  paths?: RelativePath[]
  description?: string
}

export const H1 = ({
  children,
  paths,
  reload,
  description,
  up = true,
  className = '',
  ...props
}: PropsWithChildren<H1Props>) => (
  <div
    className={cn(
      'min-h-header bg-background/80 sticky top-[-1px] z-30 mb-6 grid place-content-center backdrop-blur-md',
      className
    )}
  >
    {paths && <RelativeNav paths={paths} />}

    <div className='grid items-center justify-center sm:grid-cols-[1fr_5fr_1fr]'>
      {up ? (
        <Link href={'#top'} className={cn('unic_button max-sm:hidden')} title='Наверх'>
          <UpSvg className='text-unic size-[4.5rem]' />
        </Link>
      ) : (
        <div />
      )}

      <div>
        <h1 className='m-0' {...props}>
          {children}
        </h1>

        {description && <p>{description}</p>}
      </div>

      {reload && <ReloadButton action={reload} className='max-sm:hidden' />}
    </div>
  </div>
)
