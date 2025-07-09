import { MaxSize } from '@components/maxSize'
import { H1 } from '@components/h1'
import { SendEmailForm } from './components'

export default async function AdminPanel() {
  return (
    <MaxSize className='grid place-items-center text-center'>
      <H1
        paths={[
          { name: 'admin', displayname: 'Админка' },
          { name: 'email', displayname: 'Почта' },
        ]}>Почта</H1>

      <h3>Отправить письмо</h3>
      <SendEmailForm />
    </MaxSize>
  )
}
