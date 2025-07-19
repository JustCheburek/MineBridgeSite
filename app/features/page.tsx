// React
import type { Metadata } from 'next'

// Компоненты
import { AnalyticsSvg, BatSvg } from '@ui/SVGS'
import { MaxSize } from '@components/maxSize'
import { GLink, GContainer, GImg, GText, GBox } from '@components/grid'
import { Url } from '@components/button'
import { Img } from '@components/img'
import { H1 } from '@components/h1'
import { Suspense } from 'react'
import { Skeleton } from '@components/skeleton'
import { Streamers } from './streamers'

export const metadata: Metadata = {
  title: 'Фичи',
  description: 'Список всяких полезностей для более комфортной игры. Слишком полезно!',
}

export default function Features() {
  return (
    <MaxSize>
      <H1>Фичи</H1>

      <GContainer border>
        <GLink href='/features/lor'>
          <GImg imgs='one'>
            <BatSvg className='size-[100%]' />
          </GImg>

          <GText>Лор</GText>
        </GLink>

        <GLink href='/features/guides'>
          <GImg imgs='two'>
            <Img src='/features/guides/thinking.png' alt='Думающий чел' />
          </GImg>
          <GImg imgs='two'>
            <Img src='/features/guides/blocks.png' alt='Блоки' />
          </GImg>

          <GText>Гайды</GText>
        </GLink>

        <GLink href='/rules/mods'>
          <GImg imgs='two'>
            <Img src='/features/mods/replay_mod.png' alt='Реплей мод' />
          </GImg>
          <GImg imgs='two'>
            <Img src='/features/mods/voice_chat.png' alt='Войс чат' />
          </GImg>

          <GText>Файлы</GText>
        </GLink>

        <GLink href={`https://map.${process.env.NEXT_PUBLIC_EN_DOMAIN}`} anotherSite id='map'>
          <GImg imgs='one'>
            <Img src='/features/map.png' alt='Карта' />
          </GImg>

          <GText>Карта</GText>
        </GLink>

        <Suspense fallback={<Skeleton className='h-64 w-80' />}>
          <Streamers />
        </Suspense>

        <GBox anotherSite>
          <ul className='flex flex-wrap justify-center gap-4'>
            <li>
              <Url href='https://hotmc.ru/minecraft-server-259948' className='m-0'>
                HotMC
              </Url>
            </li>
            <li>
              <Url href='https://minecraftrating.ru/server/minebridge' className='m-0'>
                Rating
              </Url>
            </li>
          </ul>

          <GText>Голосование</GText>
        </GBox>

        <GLink href='/features/stickers'>
          <GImg imgs='three'>
            <Img src='/features/stickers/10.png' alt='Стикер' />
          </GImg>
          <GImg imgs='three'>
            <Img src='/features/stickers/0.png' alt='Стикер' />
          </GImg>
          <GImg imgs='three'>
            <Img src='/features/stickers/8.png' alt='Стикер' />
          </GImg>

          <GText>Стикеры</GText>
        </GLink>

        <GLink href='/features/design'>
          <GImg imgs='two'>
            <Img src='/index/unic/heart.webp' alt='Сердце' pixel />
          </GImg>
          <GImg imgs='two'>
            <Img src='/index/unic/calendar.webp' alt='Календарь' pixel />
          </GImg>

          <GText>Дизайн</GText>
        </GLink>

        <GLink href='/features/analytics'>
          <GImg imgs='one'>
            <AnalyticsSvg className='size-[90%]' />
          </GImg>

          <GText>Аналитика</GText>
        </GLink>
      </GContainer>
    </MaxSize>
  )
}
