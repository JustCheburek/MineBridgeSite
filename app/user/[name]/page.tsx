import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense } from 'react'
import TimeAgo from 'javascript-time-ago'
import { validate } from '@services/user/validate'
import { getUser, updateFrom } from '@services/user'
import { Social } from '@/types/url'
import { userModel } from '@db/models'
import { AutoSvg, EditSvg, MostikiSvg, StarSvg } from '@ui/SVGS'
import { URLS_START } from '@/const'
import type { NameParams } from '@/types/params'
import { Skeleton } from '@components/skeleton'
import type { User } from 'lucia'
import { GiftBox } from './components/gift'
import { cookies } from 'next/headers'

const Avatar = dynamic(() => import('@components/avatar'))
const ServerStatusSection = dynamic(() => import('./components/serverStatus'))
const TwitchFrame = dynamic(() => import('./components/twitch'))

export const generateMetadata = async ({ params }: NameParams): Promise<Metadata> => {
  const { name } = await params

  return {
    title: name,
    description: `${name} играет на Майнбридж, а ты?)`,
  }
}

const Mostiki = ({
  isMe,
  isAdmin,
  user,
  author,
}: {
  isMe: boolean
  isAdmin: boolean
  user: User
  author: User | null
}) => {
  if ((!isMe || !isAdmin) && author?.mostiki && author?.mostiki <= 0) return

  return (
    <>
      {(isAdmin || isMe) && (
        <Link href={isMe ? '/shop' : `/user/${user.name}/accounts`} className='add'>
          +
        </Link>
      )}

      {author && <GiftBox user={user} author={author} isMe={isMe} />}
    </>
  )
}

const timeAgo = new TimeAgo('ru-RU')

export default async function Profile({ params }: NameParams) {
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
    <div className="grid place-content-center gap-[100px]">
      <div className="grid place-content-center gap-[50px] md:grid-cols-[1fr_2fr] [&>*]:mx-auto">
        <Avatar src={user.photo} />

        <div className="grid gap-2.5 font-medium">
          <h2>
            <span className='text-unic select-all'>{user.name}</span>{' '}
            {(isMe || isHelper) && (
              <Link href={`/user/${user.name}/accounts`}>
                <EditSvg className='text-unic size-[0.6em]' />
              </Link>
            )}
          </h2>

          {isHelper && <small className='text-light-gray select-all'>{user._id}</small>}
          {isContentMaker && (
            <div className="flex flex-wrap whitespace-nowrap gap-x-4 gap-y-0.5">
              {user?.socials?.map(({ social, url, name }: Social) => {
                if (!social || (!url && !name)) return

                url = url || `${URLS_START[social]}${name}`

                return (
                  <Link href={url} target='_blank' title={social} key={social}>
                    <AutoSvg className='size-[38px]' type={social} />
                  </Link>
                )
              })}
            </div>
          )}
          <div className="flex flex-wrap whitespace-nowrap gap-x-4 gap-y-0.5">
            {roles.map(role => {
              const color = `#${role.color.toString(16)}`
              return (
                <small key={role.id} style={{ color }}>
                  {role.name}
                </small>
              )
            })}
          </div>
          {!isMe && (
            <div>
              <h4>
                Онлайн:{' '}
                <time dateTime={new Date(user.onlineAt || 0).toISOString()}>
                  {timeAgo.format(new Date(user.onlineAt || 0))}
                </time>
              </h4>
            </div>
          )}
          <h4>
            <Link href='/milkyway'>
              Звёзды: <strong className='text-yellow'>{user.rating}</strong> <StarSvg />
            </Link>{' '}
            {(isMe || isHelper) && (
              <Link href={isHelper ? `/user/${user.name}/history` : '/rules'} className='add'>
                +
              </Link>
            )}
          </h4>
          <div className="flex items-center gap-1">
            <h4>
              Мостики: <strong className='text-unic'>{user.mostiki}</strong> <MostikiSvg />
            </h4>{' '}
            <Mostiki user={user} author={author} isMe={isMe} isAdmin={isAdmin} />
          </div>
        </div>
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
