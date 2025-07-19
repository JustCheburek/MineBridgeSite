import { MaxSize } from '@components/maxSize'
import { H1 } from '@components/h1'
import { StarsReset } from './button'

export default async function AdminPanel() {
  return (
    <MaxSize className='grid place-items-center text-center'>
      <H1
        paths={[
          { name: 'admin', displayname: 'Админка' },
          { name: 'stars', displayname: 'Звёзды' },
        ]}
      >
        Звёзды
      </H1>

      <p>Сделать из звёзд погасшие</p>

      <StarsReset />
    </MaxSize>
  )
}
