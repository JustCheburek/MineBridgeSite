import dynamic from 'next/dynamic'
import type { User } from 'lucia'
import { AddWLConsole } from '@services/console'
import { getTime } from '@services/user/hours'

const HourStarSection = dynamic(() => import('./hourstar'))
const WhitelistSection = dynamic(() => import('./whitelist'))

type ServerStatus = {
  user: User
  isMe: boolean
}

export default async function ServerStatusSection({ user, isMe }: ServerStatus) {
  const [allHours] = await Promise.all([getTime(user.name), user.days > 0 && AddWLConsole(user.name)])

  return (
    <>
      {allHours > 0 && (
        <HourStarSection user={user} allHours={allHours} isMe={isMe} />
      )}

      <WhitelistSection user={user} isMe={isMe} />
    </>
  )
}
