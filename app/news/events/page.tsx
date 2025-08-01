// Стили
import type { Metadata } from 'next'
import { H1 } from '@components/h1'
import { Url } from '@components/button'
import { List } from '@components/rules'

export const metadata: Metadata = {
  title: 'Ивенты',
  description:
    'Поинты ивентов (ПИ) — внутриигровые награды за создания ивентов. 1 ивент = до 5 ПИ, 1 ПИ = 25 звёзд!',
}

export default function Events() {
  return (
    <>
      <div className='events_content'>
        <H1>Ивенты</H1>

        <div>
          <p>
            На сервере действуют особые <strong className='text-unic'>поинты ивентов</strong> или{' '}
            <strong className='text-unic'>ПИ</strong>
          </p>
          <br />
          <p>
            За <strong>1 ивент</strong> можно получить до <strong>5 ПИ</strong>
          </p>
          <p>
            <strong>1 ПИ</strong> = <strong>25 звёзд</strong>
          </p>
          <p>
            Если ивент нарушает правила сервера, то ПИ <strong>не начисляются</strong>
          </p>
          <br />
          <h4>Критерии ивентов:</h4>
          <List>
            <li>Уникальность</li>
            <li>Объём</li>
            <li>Красота</li>
            <li>Затрата ресурсов</li>
          </List>

          <br />

          <Url href='https://discord.gg/ZrdQ2kGuXG'>Ивенты</Url>
        </div>
      </div>
    </>
  )
}
