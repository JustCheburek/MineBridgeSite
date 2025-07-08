import Link from 'next/link'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getAllContentMakers } from '@services/user'
import { AutoSvg } from '@ui/SVGS'
import { URLS_START } from '@/const'
import type { Social } from '@/types/url'
import { Skeleton } from '@components/skeleton'
import type { User } from 'lucia'
import { H1 } from '@components/h1'
import { GBox, GContainer } from '@components/grid'

const Avatar = dynamic(() => import('@components/avatar'))

export const metadata: Metadata = {
  title: 'Контент-мейкеры',
  description: 'Снимают видосики про сервер',
}

export default async function StreamersPage() {
  const contentMakers = await getAllContentMakers()

  console.log(contentMakers)

  return (
    <div className="container mx-auto py-8">
      <H1
        up
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
              <Link href={`/user/${user.name}`} className="text-center space-y-2">
                <Avatar src={user.photo} className="mx-auto size-[80px]" />
                <h4>{user.name}</h4>
              </Link>

              <div className="flex flex-wrap justify-center gap-x-4 gap-y-0.5">
                {user?.socials?.map(({ social, url, name }: Social) => {
                  if (!social || (!url && !name)) return null
                  url = url || `${URLS_START[social]}${name}`

                  return (
                    <Link
                      href={url}
                      target="_blank"
                      title={social}
                      key={social}
                    >
                      <AutoSvg className="size-[38px]" type={social} />
                    </Link>
                  )
                })}
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
        <div key={i} className="bg-dark-gray rounded-lg p-6">
          <Skeleton className="size-[80px] mx-auto mb-2 rounded-full" />
          <Skeleton className="h-6 w-32 mx-auto mb-4" />
          <div className="flex justify-center gap-3">
            <Skeleton className="size-[42px] rounded-full" />
            <Skeleton className="size-[42px] rounded-full" />
          </div>
        </div>
      ))}
    </>
  )
} 