import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { validate } from '@services/user/validate'
import { getUser, updateFrom } from '@services/user'
import { userModel } from '@db/models'
import type { NameParams } from '@/types/params'
import { Skeleton } from '@components/skeleton'
import { cookies } from 'next/headers'

const ServerStatusSection = dynamic(() => import('./components/serverStatus'))
const TwitchFrame = dynamic(() => import('./components/twitch'))
const LinkAccounts = dynamic(() => import('./components/linkAcc'))
const Profile = dynamic(() => import('./components/profile'))

export const generateMetadata = async ({ params }: NameParams): Promise<Metadata> => {
  const { name } = await params

  return {
    title: name,
    description: `${name} играет на Майнбридж, а ты?)`,
  }
}

export default async function ProfilePage({ params }: NameParams) {
  const cookiesStore = await cookies()

  const { name } = await params
  const { user: author, isHelper, isAdmin, roles: authorRoles } = await validate()
  const { user, roles, isMe, isContentMaker } = await getUser({
    name,
    roles: true,
    authorId: author?._id,
    show: isHelper,
  })

  if (author) {
    const from: { place: string; name: string } = JSON.parse(
      cookiesStore.get('from')?.value ?? '{}'
    )

    await userModel.findByIdAndUpdate(author._id, {
      from: await updateFrom(author, from, authorRoles),
    })
  }

  return (
    <div className='grid place-content-center gap-[100px]'>
      {/* Рекомендация привязка аккаунтов */}
      <div className='w-full grid place-content-center gap-6'>
        {isMe && <LinkAccounts user={user} />}

        <Profile
          user={user}
          isMe={isMe}
          isHelper={isHelper}
          isContentMaker={isContentMaker}
          author={author}
          roles={roles}
          isAdmin={isAdmin}
        />
      </div>

      <Suspense fallback={<Skeleton className='h-[450px] w-[100%]' />}>
        <ServerStatusSection user={user} isMe={isMe} />
      </Suspense>

      {isContentMaker && (
        <Suspense fallback={<Skeleton className='h-[307px] w-[100%]' />}>
          <TwitchFrame user={user} />
        </Suspense>
      )}
    </div>
  )
}
