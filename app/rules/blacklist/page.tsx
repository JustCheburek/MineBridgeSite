// React
import type { Metadata } from 'next'

// Компоненты
import { BlacklistContent } from './components'
import { H1 } from '@components/h1'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Выражения',
  description: 'Список запреток на Twitch, которые строго запрещены и у нас на сервере!',
}

export default function Blacklist() {
  return (
    <div className='blacklist_content'>
      <H1>Запретка</H1>

      <p className='red_line'>
        Запрещены все вариации этих слов и выражений, в том числе с использованием цензуры или
        использованием иностранного языка
      </p>

      <BlacklistContent />

      <div>
        <p className='text-red'>Запрещено:</p>

        <ul>
          <li>Распространение материалов, запрещенные законодательством Российской Федерации</li>
          <li>
            Использование экстремистских материалов и упоминание организаций, признанных
            террористическими на территории Российской Федерации
          </li>
        </ul>
      </div>
      <br />
      <div>
        <p>Списки размещены на сайтах:</p>

        <ul>
          <li>
            <Link
              target='_blank'
              className='text-unic font-medium'
              href='https://minjust.gov.ru/ru/extremist-materials'
            >
              Министерства юстиции Российской Федерации
            </Link>
          </li>
          <li>
            <Link
              target='_blank'
              className='text-unic font-medium'
              href='http://www.fsb.ru/fsb/npd/terror.htm'
            >
              ФСБ России
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
