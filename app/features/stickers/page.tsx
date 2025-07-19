// React
import type { Metadata } from 'next'

// Компоненты
import { Url } from '@components/button'
import { MaxSize } from '@components/maxSize'
import { Img, ImgBox } from '@components/img'
import { GContainer } from '@components/grid'
import { H1 } from '@components/h1'

export const metadata: Metadata = {
  title: 'Стикеры',
  description: 'Можно добавить себе в телеграм. Нарисованы руками художников сервера!',
}

export default function Stickers() {
  return (
    <MaxSize>
      <H1
        paths={[
          { name: 'features', displayname: 'Фичи' },
          { name: 'stickers', displayname: 'Стикеры' },
        ]}
      >
        Стикеры
      </H1>
      <div className='mx-auto w-fit'>
      <p>
        Рисовка стикера занимает <span className='font-medium'>от 1 до 3 недель</span> в зависимости
        от сложности
      </p>
      <p>
        Стикеры добавляются в <span className='font-medium'>телеграм</span>,
        могут добавиться и на <span className='font-medium'>дискорд сервер</span>
      </p>
      </div>
      <Url href='https://t.me/addstickers/MineBridge'>Добавить</Url>

      <GContainer className='grid-cols-autofit-[200px] *:h-[200px] *:w-[200px] mb-4'>
        {Array(16)
          .fill(null)
          .map((_, sticker) => {
            let path = `/features/stickers/${sticker}.png`

            return (
              <ImgBox key={sticker} hover>
                <Img src={path} alt='стикер' width={200} height={200} />
              </ImgBox>
            )
          })}
      </GContainer>

      <h3 className='text-center'>Тоже хотите попасть в стикер пак?</h3>
      <Url href='/shop#stickers'>Да, и что?</Url>
    </MaxSize>
  )
}
