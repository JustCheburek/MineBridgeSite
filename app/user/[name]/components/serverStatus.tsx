import dynamic from 'next/dynamic'
import type { User } from 'lucia'
import { AddWLConsole, GetHoursConsole } from '@services/console'

const HourStarSection = dynamic(() => import('./hourstar'))
const WhitelistSection = dynamic(() => import('./whitelist'))

type ServerStatus = {
  user: User
  isMe: boolean
}

export default async function ServerStatusSection({ user, isMe }: ServerStatus) {
  const [hours] = await Promise.all([
    GetHoursConsole(user.name),
    user.days > 0 && AddWLConsole(user.name),
  ])

  return (
    <>
      {hours > -1 && <HourStarSection user={user} hours={hours} isMe={isMe} />}

      <WhitelistSection user={user} isMe={isMe} />
    </>
  )
}
