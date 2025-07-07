// React
import type { Metadata } from 'next'
import Link from 'next/link'

// Компоненты
import { MaxSize } from '@components/maxSize'
import { UserBox } from '@components/userBox'
import { PTitle } from '@components/post'
import { ColorsPie, Download } from './components'
import { H1 } from '@components/h1'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Дизайн',
  description: `Дизайн разрабатывается уже с 2022 года, за это время его успели много раз измучить...`,
}

export default function Design() {
  const data = [
    { title: 'Акцент', value: 10, color: '#00A7B1' },
    { title: 'Текст', value: 30, color: '#F1F1F1' },
    { title: 'Фон (основной)', value: 60, color: '#161C1F' },
    { title: 'Фон (вторичный)', value: 10, color: '#000000' },
  ]

  return (
    <MaxSize className='max-w-[900px]'>
      <H1
        up
        paths={[
          { name: 'features', displayname: 'Фичи' },
          { name: 'design', displayname: 'Дизайн' },
        ]}
      >
        Дизайн
      </H1>

      <section className='grid place-items-center'>
        <PTitle>
          <h2>Авторы</h2>
        </PTitle>
        <div className='*:card flex flex-wrap justify-center gap-x-6 *:px-8 *:py-2'>
          <UserBox _id='j8bsrsdgzqa4n0c' />
          <UserBox _id='i5mqq2js4nos1yj' />
          <UserBox _id='t2dhhl5igw1sp43' />
        </div>
      </section>

      <section className='grid place-items-center'>
        <PTitle>
          <h2>Шрифт</h2>
        </PTitle>
        <p>
          <Link
            target='_blank'
            href='https://fonts.google.com/specimen/Montserrat'
            className='text-unic'
          >
            <strong>Montserrat</strong>
          </Link>{' '}
          — популярный модерн шрифт
        </p>
      </section>

      <section className='grid place-items-center'>
        <PTitle>
          <h2>Цвета</h2>
        </PTitle>
        <div className='card grid w-full place-content-center gap-6 p-8 md:grid-cols-2'>
          <div className='my-auto'>
            {data.map(color => (
              <div
                key={color.title}
                className='grid grid-cols-[auto_1fr_auto] place-content-center gap-3'
              >
                <div
                  style={{ background: color.color }}
                  className={cn(
                    'size-6 rounded-full',
                    color.title === 'Фон' && 'border-text border'
                  )}
                ></div>
                <p>{color.title}</p>
                <code>{color.color}</code>
              </div>
            ))}
          </div>
          <ColorsPie data={data} />
        </div>
      </section>

      <section className='grid place-items-center'>
        <PTitle>
          <h2>Лого</h2>
        </PTitle>
        <Download />
      </section>
    </MaxSize>
  )
}
