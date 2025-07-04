import { MaxSize } from '@components/maxSize'
import { H1 } from '@components/h1'
import { getUsers } from '@services/user'
import { AdminWhitelistReset } from './components'
import { User } from 'lucia'

export default async function WhitelistPage() {
  const users = await getUsers()
  const userswl = users.filter((user: User) => user.whitelist)

  return (
    <MaxSize className='grid place-items-center'>
      <H1>Проходка</H1>
      <AdminWhitelistReset userswl={userswl} />
      {userswl.length === 0 && <p className='text-center'>Нет пользователей с проходкой</p>}
      {userswl.map((user: any) => (
        <p key={user._id}>{user.name}</p>
      ))}
    </MaxSize>
  )
}
