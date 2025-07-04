import type { User } from 'lucia'
import { UserBox } from '@components/userBox'
import { InviteLink } from './inviteLink'

type InviteSection = {
  user: User
  isMe: boolean
  isHelper: boolean
}

export default function InviteSection({ user, isMe, isHelper }: InviteSection) {
  const invites = user.invites.slice(user.invites.length - 15)

  return (
    <section>
      <h2 className='text-center'>Приглашения</h2>
      <h3 className='text-center'>1 приглашение = 5 звёзд</h3>
      {isMe && <InviteLink name={user.name} />}
      <FromBox user={user} isMe={isMe} isHelper={isHelper} />
      <h4>
        Приглашений: <strong className='text-unic'>{user.invites.length}</strong>
      </h4>
      {invites.length > 0 && <>
        <p>Последние {invites.length}:</p>
        <div className="grid grid-cols-autofit-60 gap-x-4">
          {invites.map(userId => (
            <UserBox key={userId} _id={userId} />
          ))}
        </div>
      </>}
    </section>
  )
}

function FromBox({ user, isMe, isHelper }: { user: User; isMe: boolean; isHelper: boolean }) {
  if (!user?.from || !user.from?.userId || !user.from?.place) return

  return (
    <div className="flex justify-center items-center flex-wrap gap-[0.6em]">
      <p>{isMe ? 'Ты пришёл' : 'Пришёл'} от</p>
      <UserBox _id={user.from.userId} />
      {isHelper && <p className='text-unic'>{user.from.place}</p>}
    </div>
  )
}
