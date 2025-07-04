import { PropsWithChildren } from 'react'
import Link from 'next/link'

export function CheckLink({
  href,
  target = '_self',
  children,
}: PropsWithChildren<{ href?: string; target?: string }>) {
  if (!href) return children

  if (href?.toString()?.startsWith('http')) {
    target = '_blank'
  }

  return (
    <Link href={href} target={target}>
      {children}
    </Link>
  )
}
