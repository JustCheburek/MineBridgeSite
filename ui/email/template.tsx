import { PropsWithChildren } from 'react'
import { User } from 'lucia'

export const Template = ({
  name,
  children,
}: PropsWithChildren<{
  name: User['name']
}>) => (
  <div className='text-text'>
    <h1>
      Привет, <span className='text-unic'>{name}</span>!
    </h1>

    <p>Это администрация майнкрафт сервера MineBridge</p>
    <br />

    {children}

    <br />
    <p>
      Ты получил это письмо, потому что ты ценный участник{' '}
      <strong>
        <a href='https://m-br.ru'>сообщества MineBridge</a>
      </strong>
    </p>
    <p>
      Можешь следить за актуальными новостями в{' '}
      <strong>
        <a href='https://t.me/MineBridgeOfficial'>телеграме</a>
      </strong>{' '}
      или{' '}
      <strong>
        <a href='https://discord.gg/rmWAuKGb69'>дискорде</a>
      </strong>
    </p>
    <br />
    <a href='https://m-br.ru/auth'>Отказаться от рассылки</a>
  </div>
)
