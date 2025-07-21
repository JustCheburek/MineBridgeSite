// Сервер
import { getUser } from '@services/user'
import Link from 'next/link'
import { type PropsWithChildren, Suspense } from 'react'
import { idOrNameUser } from '@/types/idOrName'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

// Компоненты
import { Skeleton } from '@components/skeleton'
const Avatar = dynamic(() => import('@components/avatar'))

type UserBox = PropsWithChildren<idOrNameUser & { className?: string, photo?: string }>
export async function UserBox({ _id, name, photo, className, children }: UserBox) {
  if (!name && !photo) {
    const info = await getUser({ _id, name, throwNotFound: false }).catch(console.error)
    if (!info) return
    name = info.user.name
    photo = info.user.photo
  }

  return (
    <Suspense fallback={<Skeleton className='h-[50px] w-[150px]' />}>
      <Link
        href={`/user/${name}`}
        className={cn('my-[0.6rem] flex items-center gap-4', className)}
      >
        <Avatar src={photo || ''} className='size-[50px]' />
        <p>{name}</p>
        {children}
      </Link>
    </Suspense>
  )
}
