// React
import type { Metadata } from 'next'

// Компоненты
import { Url } from '@components/button'
import { MaxSize } from '@components/maxSize'
import { GContainer, GBox } from '@components/grid'
import { Totem } from '@components/img'
import { H1 } from '@components/h1'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Тотемы',
  description: 'Оставьте свой след в истории!',
  robots: {
    index: false,
  },
}

export default function Totems() {
  const totems = [
    'JustCheburek',
    'Kawa11Fox',
    'JustVayk',
    'Melissa21',
    'IIIU3A45',
    'TOXSER',
    'Pepel7',
    'JustHi_jey',
    '_rkrmv',
    'lololoshca1234',
    'KaharIRN',
    '_drdrost_',
    'ziduha_152',
    'M0vain',
    '_1drakon4ik_1',
    'fantomvip23',
    '_lakrkarBroYT',
    'Rub_Kub',
    'MarioBoi',
    'DobiFedor',
    '_Fredimine_',
    'Surglir',
    'IIeschanik29334',
    'S1erCake',
    'VeBray',
  ]

  // Доступные предопределенные классы вращения в Tailwind
  const rotateClasses = [
    'group-hover:rotate-3',
    'group-hover:rotate-6',
    'group-hover:rotate-12',
    'group-hover:rotate-45',
    'group-hover:rotate-50',
    'group-hover:rotate-60',
    'group-hover:rotate-90',
    'group-hover:rotate-120',
    'group-hover:rotate-180',
    'group-hover:-rotate-3',
    'group-hover:-rotate-6',
    'group-hover:-rotate-12',
    'group-hover:-rotate-45',
    'group-hover:-rotate-50',
    'group-hover:-rotate-60',
    'group-hover:-rotate-90',
    'group-hover:-rotate-120',
    'group-hover:-rotate-180',
  ]

  return (
    <MaxSize>
      <H1
        paths={[
          { name: 'features', displayname: 'Фичи' },
          { name: 'totems', displayname: 'Тотемы' },
        ]}
      >
        Тотемы
      </H1>
      <h3 className='text-center'>Версия: 2.4</h3>

      <Url href='https://modrinth.com/resourcepack/minebridge-totems/versions'>Скачать</Url>

      <GContainer className='grid-cols-autofit-[180px] *:h-[240px] *:w-[180px]'>
        {totems.map(totem => {
          let file = totem.toLowerCase()

          if (file.startsWith('_')) {
            file = file.substring(1)
          }

          // Выбираем случайный класс вращения из доступных предопределенных классов
          const randomRotateClass = rotateClasses[Math.floor(Math.random() * rotateClasses.length)]

          return (
            <GBox key={totem} className='group'>
              <Totem
                src={`/features/totems/${file}.png`}
                alt={totem}
                className={cn('transition-all duration-1000', randomRotateClass)}
              />

              <p>{totem}</p>
            </GBox>
          )
        })}
      </GContainer>

      <h3 className='text-center'>Тоже хотите попасть в ресурс пак?</h3>
      <Url href='https://discord.gg/UEEsPXrtmV'>Да, и что?</Url>
      <small className='flex items-center justify-center'>(полный список по ссылке)</small>
    </MaxSize>
  )
}
