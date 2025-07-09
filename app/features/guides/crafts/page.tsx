// React
import type { Metadata } from 'next'

// Стили
import { MaxSize } from '@components/maxSize'
import { PBox, PText, PTitle } from '@components/post'
import { Img, ImgBox } from '@components/img'
import { NotFound } from '@components/notFound'
import { H1 } from '@components/h1'

export const metadata: Metadata = {
  title: 'Крафты',
  description: 'Самые уникальные, актуальные и нужные крафты сервера!',
}

export default function Crafts() {
  return (
    <MaxSize>
      <H1
        paths={[
          { name: 'features', displayname: 'Фичи' },
          { name: 'guides', displayname: 'Гайды' },
          { name: 'crafts', displayname: 'Крафты' },
        ]}
      >
        Крафты
      </H1>

      <PBox>
        <ImgBox type='post'>
          <Img alt='Трава' src='/features/guides/crafts/grass.png' />
        </ImgBox>
        <PTitle>
          <h2>Трава</h2>
        </PTitle>
      </PBox>

      <PBox>
        <ImgBox type='post'>
          <Img alt='Меч отладки' src='/features/guides/crafts/sword.png' />
        </ImgBox>
        <PTitle>
          <h2>Меч отладки</h2>
        </PTitle>
        <PText>
          <p>100 прочности</p>
        </PText>
      </PBox>

      <PBox>
        <ImgBox type='post'>
          <Img alt='Невидимое освещение' src='/features/guides/crafts/light_craft.png' />
        </ImgBox>
        <PTitle>
          <h2>Невидимое освещение</h2>
        </PTitle>
        <PText>
          <p>Как факел, только невидимый</p>
          <p>
            Есть второй вариант крафта, с результатом в 9 блоков, но при этом пыль, слитки и панели
            заменяются на полные блоки
          </p>
        </PText>
      </PBox>

      <PBox>
        <ImgBox type='post'>
          <Img alt='Невидимое освещение' src='/features/guides/crafts/dragon_breath.png' />
        </ImgBox>
        <PTitle>
          <h2>Драконье дыхание</h2>
        </PTitle>
        <PText>
          <p>8 бутылок + драконья бошка = 8 бутылок драконьего дыхания</p>
        </PText>
      </PBox>

      <h2 className='text-center'>Камнерез</h2>
      <PBox>
        <ImgBox type='post'>
          <Img alt='Лёд' src='/features/guides/crafts/ice.png' />
        </ImgBox>
        <PTitle>
          <h2>Лёд</h2>
        </PTitle>
        <PText>
          <p>Более плотные льды можно разрезать в менее плотные</p>
        </PText>
      </PBox>

      <NotFound buttonText='Гайды' href='/features/guides'>
        Также некоторые крафты есть в гайдах
      </NotFound>
    </MaxSize>
  )
}
