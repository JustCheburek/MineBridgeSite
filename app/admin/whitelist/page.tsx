import { MaxSize } from '@components/maxSize'
import { H1 } from '@components/h1'
import { getUsersWhitelist } from '@services/user'
import { WhitelistReset } from './button'
import { revalidateTag } from 'next/cache'

export default async function WhitelistPage() {
  const users = await getUsersWhitelist()

  return (
    <MaxSize className='grid place-items-center'>
      <H1 
        reload={async () => {
          'use server'
          revalidateTag('all')
        }}
        paths={[
          { name: 'admin', displayname: 'Админка' },
          { name: 'whitelist', displayname: 'Проходка' },
        ]}>Проходка</H1>
      <WhitelistReset users={users} />
      {users.length === 0 && <p className='text-center'>Нет пользователей с проходкой</p>}
      {users.map((user: any) => (
        <p key={user._id}>{user.name}</p>
      ))}
    </MaxSize>
  )
}
