// React
import type { Metadata } from 'next'

// Типа база данных
import recipes from './recipes.json'
import { RecipeProps } from '@/types/recipe'
import { columns } from '@columns/brewery'

// Компоненты
import { Table } from '@components/table'
import { MaxSize } from '@components/maxSize'
import { PBox, PText, PTitle } from '@components/post'
import { Img, ImgBox } from '@components/img'
import { H1 } from '@components/h1'
import { List } from '@components/rules'

export const metadata: Metadata = {
  title: 'BreweryX',
  description:
    'Гайд на плагин BreweryX! Ферментация (горячий котёл), дистилляция (зельеварка), выдержка (маленькая и большая бочки). Рецепты разных напитков на сервере MineBridge!',
}

export default function Brewery() {
  return (
    <MaxSize>
      <H1
        up
        paths={[
          { name: 'features', displayname: 'Фичи' },
          { name: 'guides', displayname: 'Гайды' },
          { name: 'brewery', displayname: 'BreweryX' },
        ]}
      >
        BreweryX
      </H1>

      <p className='text-center'>Плагин на дополнительные дополнительные напитки</p>

      <PBox>
        <ImgBox type='post'>
          <Img src='/features/guides/brewery/kettle.webp' alt='Котёл' />
        </ImgBox>

        <PTitle>
          <h2>Ферментация</h2>
          <h4>1 этап</h4>
        </PTitle>

        <PText>
          <List>
            <li>
              Поставьте <span className='font-medium'>котёл</span> на источник тепла
              <br />
              <small>(лаву, магму или огонь)</small>
            </li>
            <li>Наполните его водой</li>
            <li>
              Добавьте <span className='font-medium'>ингредиенты</span> в котёл с помощью ПКМ
            </li>
            <li>Ожидайте указанное в рецепте время</li>
            <li>
              Забирайте закваску <span className='font-medium'>стеклянными бутыльками</span>
            </li>
          </List>
        </PText>
      </PBox>

      <PBox>
        <ImgBox type='post'>
          <Img src='/features/guides/brewery/brewing_stand.webp' alt='Зельеварка' />
        </ImgBox>

        <PTitle>
          <h2>Дистилляция</h2>
          <h4>2 этап</h4>
        </PTitle>

        <PText>
          <List>
            <li>
              Положите бутылку с закваской в <span className='font-medium'>зельеварку</span>
            </li>
            <li>
              Поместите <span className='font-medium'>светящуюся пыль</span> сверху в качестве
              ингредиента
            </li>
          </List>
        </PText>
      </PBox>

      <PBox>
        <PTitle>
          <h2>Выдержка</h2>
          <h4>3 этап</h4>
        </PTitle>

        <PText>
          <p>
            Для выдержки необходимо построить <span className='font-medium'>деревянную бочку</span>
          </p>
          <p>Для различных рецептов нужны разные виды дерева</p>
          <p>Один майнкрафт день = 1 год</p>
        </PText>

        <ImgBox type='post'>
          <Img src='/features/guides/brewery/small_barrel.webp' alt='Маленькая бочка' />
        </ImgBox>

        <PTitle>
          <h3>Маленькая бочка</h3>
          <h4>9 слотов</h4>
        </PTitle>

        <PText>
          <div>
            <p>Для постройки нужно:</p>

            <List>
              <li>8 ступенек</li>
              <li>
                Табличка с надписью «<code className='text-unic font-medium'>Бочка</code>»
              </li>
            </List>
          </div>
        </PText>

        <ImgBox type='post'>
          <Img src='/features/guides/brewery/big_barrel.webp' alt='Маленькая бочка' />
        </ImgBox>

        <PTitle>
          <h3>Большая бочка</h3>
          <h4>27 слотов</h4>
        </PTitle>

        <PText>
          <div>
            <p>Для постройки нужно (полая внутри):</p>
            <List>
              <li>16 ступенек</li>
              <li>18 досок</li>
              <li>1 забор</li>
              <li>
                Табличка с надписью «<code className='text-unic font-medium'>Бочка</code>»
              </li>
            </List>
          </div>
        </PText>
      </PBox>

      <Table<RecipeProps> columns={columns} data={Object.values(recipes)}>
        <h2 className='text-unic'>Рецепты</h2>
      </Table>
    </MaxSize>
  )
}
