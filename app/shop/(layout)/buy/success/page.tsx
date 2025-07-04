import { H1 } from '@components/h1'
import { TextUrl } from '@components/textUrl'
import { Url } from '@components/button'
import { validate } from '@services/user/validate'
import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'

export default async function Success() {
  const { user } = await validate()

  if (!user) {
    return redirect('/auth')
  }

  return (
    <div className='grid place-items-center'>
      <H1
        reload={async () => {
          'use server'
          revalidateTag('userLike')
        }}
      >
        Успешно
      </H1>
      <div>
        <p>Мостики выдаются автоматически в течение нескольких минут</p>
        <p>
          При любых проблемах пишите:{' '}
          <TextUrl href='https://t.me/JustCheburek'>JustCheburek</TextUrl>{' '}
          <TextUrl href='https://t.me/Dezelink'>Dezelink</TextUrl>
        </p>
      </div>
      <Url href={`/user/${user.name}`}>Профиль</Url>
    </div>
  )
}
