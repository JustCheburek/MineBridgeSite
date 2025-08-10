'use server'
import type { User } from 'lucia'
import { Url } from '@components/button'
import { GetStarsForm } from './getStars'
import { StarSvg } from '@ui/SVGS'

export default async function HourStarSection({
  user,
  allHours,
  isMe,
}: {
  allHours: number
  user: User
  isMe: boolean
}) {
  const max = 24

  // Все - сохранённые
  const hours = allHours - (user.hours || 0)
  // Минимум: наиграно или макс
  const stars = Math.floor(Math.min(hours, max) / 2)
  // Потеряно: наиграно - макс -> звёзды
  const lost = Math.floor((hours - max) / 2)

  return (
    <section className='grid place-items-center text-center'>
      <h2>2 часа = 1 <StarSvg /></h2>
      <p>Всего наиграно: {allHours}ч</p>
      <p>Без получения: {hours}ч ({max}ч лимит)</p>
      {lost >= 1 && <p className='text-red'>Вы потеряли {lost} <StarSvg/></p>}
      
      {stars === 0 && <Url href={`/user/${user.name}/history`}>Звёзды</Url>}
      {isMe && stars > 0 && <GetStarsForm _id={user._id} stars={stars}/>}
    </section>
  )
}
