// Сервер
import type { PropsWithChildren } from 'react'
import { validate } from '@services/user/validate'
import { getUser } from '@services/user'

// Компоненты
import { AutoSvg, SuccessSvg } from '@ui/SVGS'
import { ChangeForm, DeleteUserBox } from './components/change'
import type { User } from 'lucia'
import { H1 } from '@components/h1'
import { CheckLink } from '@components/checkLink'
import { NameParams } from '@/types/params'
import { NotificationsForm } from './components/notifications'
import { PassForm } from '@app/user/[name]/accounts/components/pass'
import { cn } from '@/lib/utils'

export const generateMetadata = async ({ params }: NameParams) => {
  const { name } = await params

  return {
    title: `${name} > Аккаунты`,
    description: `Привязанные интеграции ${name}! (супер секретно)`,
  }
}

const providers = {
  email: 'email',
  discord: 'discordId',
  google: 'googleId',
  twitch: 'twitchId',
}
type providerName = keyof typeof providers
const providersNames = Object.keys(providers) as providerName[]

export default async function Accounts({ params }: NameParams) {
  const { name } = await params
  const { user: author, isModer, isAdmin, isHelper } = await validate()
  const { user, isMe, isContentMakerCheck } = await getUser({
    name,
    roles: true,
    authorId: author?._id,
    show: isHelper,
  })

  return (
    <div className='account_content'>
      <H1 up className="hidden sm:block">
        Аккаунты
      </H1>
      <H1 className="block sm:hidden">Акки</H1>

      {(isMe || isHelper) && (
        <ChangeForm
          user={user}
          isMe={isMe}
          isHelper={isHelper}
          isAdmin={isAdmin}
          isContentMaker={isContentMakerCheck}
        />
      )}

      {(isMe || isHelper) && <NotificationsForm user={user} />}

      <div className="grid gap-4 justify-center items-center">
        {providersNames.map(id => (
          <Provider
            // @ts-ignore
            id={user[providers[id]]}
            name={id}
            key={id}
            user={user}
            isMe={isMe}
          >
            <AutoSvg
              type={id}
              colorful
              className={cn('size-[1.5em]', {
                "scale-[1.3]": id === 'discord',
              })}
            />
          </Provider>
        ))}
      </div>

      {(isMe || isModer) && <PassForm user={user} />}
      {isModer && <DeleteUserBox user={user} />}
    </div>
  )
}

type Provider = {
  name: providerName
  isMe: boolean
  user: User
  id?: string
}

function Provider({ id, user, name, isMe, children }: PropsWithChildren<Provider>) {
  if (!id && !isMe) {
    return null
  }

  return (
    <CheckLink href={name === 'email' ? undefined : `/auth/${name}?name=${user.name}`}>
      <div className="py-4 px-6 borderbox rounded-input bg-gray grid grid-cols-[auto_1fr_auto] space-x-4 w-full">
        {children}
        {id
          ? <>
            <code className={cn('text-center font-medium max-xs:hidden')}>
              {id}
            </code>
            <SuccessSvg className='size-[1.5em]' />
          </>
          : <span className='text-unic font-medium'>Привязать</span>
        }
      </div>
    </CheckLink>
  )
}
