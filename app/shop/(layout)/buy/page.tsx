import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { validate } from '@services/user/validate'
import { MostikiSvg } from '@ui/SVGS'
import { H1 } from '@components/h1'
import { TextUrl } from '@components/textUrl'
import { PaymentForm } from './components'
import { getAllPayments } from '@services/user/payments'
import { GBox, GContainer } from '@components/grid'
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru'
import { UserBox } from '@components/userBox'

export const metadata: Metadata = {
  title: 'Покупка',
  description: 'Покупка мостиков: 1₽ = 1 мостик. Подержите нас донатиком, пж!',
}

TimeAgo.addLocale(ru)
const timeAgo = new TimeAgo('ru-RU')

export default async function Component() {
  const { user } = await validate()

  if (!user) {
    return redirect('/auth')
  }

  const payments = (await getAllPayments()).slice(0, 6)

  return (
    <div>
      <H1>Покупка</H1>
      <h3 id='mostiki' className='text-center'>
        1 ₽ = 1 <MostikiSvg />
      </h3>

      <PaymentForm user={user} />

      <div>
        <p>Мостики выдаются автоматически в течение нескольких минут</p>
        <p>
          Если есть вопросы, задавайте:{' '}
          <TextUrl href='https://t.me/JustCheburek'>JustCheburek</TextUrl>{' '}
          <TextUrl href='https://t.me/Dezelink'>Dezelink</TextUrl>
        </p>
      </div>

      <div className='my-4 flex flex-wrap items-center justify-center gap-x-8 sm:justify-between'>
        <p>Последние 6 покупок:</p>
        <small className='text-light-gray'>Покупки 1 игрока суммируются</small>
      </div>

      <GContainer className='grid-cols-autofit-60 mb-10 gap-6 *:h-40 *:w-60' border>
        {payments.map(payment => (
          <GBox key={payment.id}>
            <div className='text-center'>
              <UserBox name={payment.user.name} photo={payment.user.photo} />
              <h3>
                {payment.cost} <MostikiSvg />
              </h3>
              <small className='text-light-gray'>
                {timeAgo.format(new Date(payment.updated_at))}
              </small>
            </div>
          </GBox>
        ))}
      </GContainer>
    </div>
  )
}
