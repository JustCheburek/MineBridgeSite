import Link from 'next/link'
import { User } from 'lucia'
import { URLS_START } from '@/const'
import dynamic from 'next/dynamic'
import TimeAgo from 'javascript-time-ago'
import { StarSvg, MostikiSvg, DiscordSvg, AutoSvg, EditSvg } from '@/ui/SVGS'
import { GiftBox } from './gift'
import type { Role } from '@/types/role'
import { Skeleton } from '@components/skeleton'
import { Suspense } from 'react'

const Avatar = dynamic(() => import('@components/avatar'))

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

export default function Profile({
  user,
  isMe,
  isHelper,
  isContentMaker,
  author,
  roles,
  isAdmin,
}: {
  user: User
  isMe: boolean
  isHelper: boolean
  isContentMaker: boolean
  author: User | null
  roles: Role[]
  isAdmin: boolean
}) {
  return (
    <section className='grid place-content-center gap-[50px] md:grid-cols-[1fr_2fr] [&>*]:mx-auto'>
      <Suspense fallback={<Skeleton className='size-[180px] rounded-[25%]' />}>
        <Avatar src={user.photo} />
      </Suspense>
      <div className='grid gap-2.5 font-medium'>
        <h2>
          <span className='text-unic select-all'>{user.name}</span>{' '}
          {(isMe || isHelper) && (
            <Link href={`/user/${user.name}/accounts`}>
              <EditSvg className='text-unic size-[0.6em]' />
            </Link>
          )}
        </h2>

        {isHelper && <code className='text-light-gray'>{user._id}</code>}
        {isContentMaker && (
          <div className='flex flex-wrap gap-x-4 gap-y-0.5 whitespace-nowrap'>
            {user.urls &&
              Object.entries(user.urls).map(([url, name]) => {
                if (!name || url === '_id') return
                return (
                  <Link
                    href={`${URLS_START[url as keyof typeof URLS_START]}${name}`}
                    target='_blank'
                    title={url}
                    key={url}
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
                key='discord'
              >
                <DiscordSvg className='size-[38px]' />
              </Link>
            )}
          </div>
        )}
        <div className='flex flex-wrap gap-x-4 gap-y-0.5 whitespace-nowrap'>
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
        <h4>
          <Link href='/shop#pass'>
            Погасшие: <strong className='text-faded'>{user.faded_rating ?? 0}</strong>{' '}
            <StarSvg className='text-faded' />
          </Link>
        </h4>
        <div className='flex items-center gap-1'>
          <h4>
            Мостики: <strong className='text-unic'>{user.mostiki}</strong> <MostikiSvg />
          </h4>{' '}
          <Mostiki user={user} author={author} isMe={isMe} isAdmin={isAdmin} />
        </div>
      </div>
    </section>
  )
}
