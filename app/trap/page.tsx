// React
import type { Metadata } from 'next'

// Компоненты
import { MaxSize } from '@components/maxSize'
import { H1 } from '@components/h1'
import { List } from '@components/rules'

export const metadata: Metadata = {
  title: 'Ловушка',
  description: 'Ты попал в ловушку, поздравляю!',
  openGraph: {
    videos: ['https://youtu.be/2Xwc-WBO5yU&t=3s'],
  },
}

export default function Trap() {
  return (
    <MaxSize className='max-w-[900px]'>
      <H1>Горячая картошка</H1>
      <p>
        Если ты это читаешь, значит скорей всего тебе дали эту{' '}
        <strong className='text-unic'>карту с QR кодом</strong>!
      </p>
      <p>Да-да, это горячая картошка! Тебе нужно передать эту карту другому игроку</p>
      <br />
      <p>Немного правил:</p>
      <List>
        <li>Передать надо в течение 4 дней</li>
        <li>Игрок может получить карту, даже если он её уже получал</li>
        <li>Убивать нельзя, передавать предмет только выбрасыванием предмета</li>
        <li>
          В чужие сундуки класть тоже нельзя, передача должна быть только из инвентаря в инвентарь
        </li>
        <li>
          По возможности заснять весь процесс передачи карты на OBS или другие программы, по
          окончанию ивента скинуть видео в общий чатик
        </li>
        <li>При нарушении правил можно получить снижение звёзд</li>
      </List>
    </MaxSize>
  )
}
