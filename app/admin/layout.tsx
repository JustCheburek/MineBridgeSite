import { PropsWithChildren } from 'react'
import { validate } from '@services/user/validate'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
  },
}

export default async function Layout({ children }: PropsWithChildren) {
  const { isAdmin } = await validate()

  if (!isAdmin) {
    redirect('/')
  }

  return children
}
