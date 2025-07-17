import Link from 'next/link'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getAllContentMakers } from '@services/user'
import { AutoSvg, DiscordSvg } from '@ui/SVGS'
import { Skeleton } from '@components/skeleton'
import type { User } from 'lucia'
import { H1 } from '@components/h1'
import { GBox, GContainer } from '@components/grid'
import { revalidateTag } from 'next/cache'
import { URLS_START } from '@/const'

const Avatar = dynamic(() => import('@components/avatar'))

export const metadata: Metadata = {
  title: 'Контент-мейкеры',
  description: 'Снимают видосики про сервер',
}

export default async function StreamersPage() {
  const contentMakers = await getAllContentMakers()

  return (
    <div className='container mx-auto py-8'>
      <H1
        reload={async () => {
          'use server'
          revalidateTag('all')
        }}
        paths={[
          { name: 'features', displayname: 'Фичи' },
          { name: 'streamers', displayname: 'Контент-мейкеры' },
        ]}
      >
        Контент
      </H1>

      <GContainer border>
        <Suspense fallback={<ContentMakersSkeleton />}>
          {contentMakers.map((user: User) => (
            <GBox key={user._id} className='flex-col space-y-2'>
              <Link href={`/user/${user.name}`} className='space-y-2 text-center'>
                <Avatar src={user.photo} className='mx-auto size-[80px]' />
                <h4>{user.name}</h4>
              </Link>

              <div className='flex flex-wrap justify-center gap-x-4 gap-y-0.5'>
                {user.urls &&
                  Object.entries(user.urls).map(([url, name]) => {
                    if (!name || url === '_id') return
                    return (
                      <Link
                        key={url}
                        href={`${URLS_START[url as keyof typeof URLS_START]}${name}`}
                        target='_blank'
                        title={url}
                      >
                        <AutoSvg className='size-[38px]' type={url} />
                      </Link>
                    )
                  })}
                {user.discordId && (
                  <Link
                    href={`https://discord.com/users/${user.discordId}`}
                    target='_blank'
                    title='Discord'
                  >
                    <DiscordSvg className='size-[38px]' />
                  </Link>
                )}
              </div>
            </GBox>
          ))}
        </Suspense>
      </GContainer>
    </div>
  )
}

function ContentMakersSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <div key={i} className='bg-dark-gray rounded-lg p-6'>
          <Skeleton className='mx-auto mb-2 size-[80px] rounded-full' />
          <Skeleton className='mx-auto mb-4 h-6 w-32' />
          <div className='flex justify-center gap-3'>
            <Skeleton className='size-[42px] rounded-full' />
            <Skeleton className='size-[42px] rounded-full' />
          </div>
        </div>
      ))}
    </>
  )
}
