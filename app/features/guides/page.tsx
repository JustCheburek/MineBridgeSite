// React
import type { Metadata } from 'next'

// Компоненты
import { MaxSize } from '@components/maxSize'
import { GLink, GContainer, GText, GImg } from '@components/grid'
import { Img } from '@components/img'
import { H1 } from '@components/h1'

export const metadata: Metadata = {
  title: 'Гайды',
  description: 'Гайды всегда полезные, особенно от MineBridge!',
}

export default function Guides() {
  return (
    <MaxSize>
      <H1
        paths={[
          { name: 'features', displayname: 'Фичи' },
          { name: 'guides', displayname: 'Гайды' },
        ]}
      >
        Гайды
      </H1>

      <GContainer border>
        <GLink href='/features/guides/crafts'>
          <GImg type='grid' imgs='two'>
            <Img src='/features/guides/crafts/light.png' alt='Свет' pixel />
          </GImg>
          <GImg type='grid' imgs='two'>
            <Img src='/features/guides/crafts/dragon_breath.webp' alt='Драконье дыхание' pixel />
          </GImg>

          <GText>Крафты</GText>
        </GLink>

        <GLink href='/features/guides/brewery'>
          <GImg type='grid' imgs='three'>
            <Img
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABK0lEQVR4XmMYBaMhMBoCoyEwGgLkhsDFHI//IAzTj84n1lymgY4CFnIdcOTUObDWi4++/AcxjoQokWUU05BLhBvPvvwPwrgcTkgeXd/QSQOwuM6ovQb2BCwUinImongqNSINRd7fWJwRXzQPeAgwEkqEMJ+7OkeDlc5eMQtMd0x6CKY/v7qEYsT3D/cg4m+ugmm3jEIwvaTYAatdQycN8IpoYw2sX99eg8XZuETBNKcAaeXB4A+BB6+/ovi8umYzCv/3j3coIRCbZATmz5n8goEYMPhDYPWB6yipGuYrWFyzsPODhWCpn4EBEgIfn5+GKrXBGxCDvxyAOT+m9wC41ts1ox8shJ4r0opCwOK9VY1gmlD+h5k7dEIAPSQYCABcJR+6tqHXHmAYbgAAR29oifwpnJwAAAAASUVORK5CYII='
              alt='Оседающее зелье'
              pixel
            />
          </GImg>
          <GImg type='grid' imgs='three'>
            <Img
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABUElEQVR4XmMYBSM+BBjJDYGLOR7/kfVeu3UXzI3cdZskM5kGOgpIDoGLj76Aff7z9Hqsbn+u4AYW9zcWJ8rsAQ8BFlKj4MHrr2At32Y2oWh99+EjmC8z/TJJRjIN2Wy48ezL/yAM80BM74H/IEyqhwY8BEYdQHIaBJUDsLIAm2ZS08LQKQlhvs6ovQb2eEWePJguypmIEhCf31wF890yCsH0kmIHvCXi4A8BmM9dnaPBPpq9YhaY7pj0EEx/fnUJJQS+f7gHEScyJIZOXcAroo01x/z69hoszsYlCqY5BZRIylmDPwRgtR/MW9U1m1F8+PvHO5QQiE0yAvPnTH5BVEgM/hBYfeA6SqqGeQsW1yzs/GAhWOpnYICEwMfnp6FKbfCGxNApCWF1/a4Z/WAfoeeKtKIQsHhvVSOYHj4lIXoEEtvqIVQHwMwdum1ChuECAAkBeDEWsEl+AAAAAElFTkSuQmCC'
              alt='Зелье'
              pixel
            />
          </GImg>
          <GImg type='grid' imgs='three'>
            <Img
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABVUlEQVR4XmMYBSM+BBhpFQIXczz+I5utP2UHVruYBjoKWKjtAHSfX7t1F68VwycEYnoPgOP8yMowsI+FBPiJCtyhHwIbz74E+9zfWBycypdA/T3VjOE/MUEw4CFAdjmA7nOYb2HiTzJ1wULZp17htWPopYGLj76A41Zfjgevzwj5HBZiQycEYD7PqL0GdjwsrotyJqIk9tSINBR5WO7AlSMGfy6A+dzVORrsidkrZoHpjkkPwfTnV5dQPPf9wz2I+JurYNotoxBMLyl2GOK1Ia+INtZo/PXtNVicjUsUTHMKKDGQAgZ/Lnjw+iuKh6prNqPwf/94hxICsUlGYP6cyS+ICoihUw58hqZqmLdgcc3CDqn3YamfgQESAh+fn4YqtcEbEkOnNoS1eHbN6Af7CD1XpBWFgMV7qxrBNKH8DwuWodcegIUEoSSOq+RD1zfgIcAw4gEAmmZsshnsesIAAAAASUVORK5CYII='
              alt='Взрывное зелье'
              pixel
            />
          </GImg>

          <GText>Brewery</GText>
        </GLink>

        <GLink href='https://modrinth.com/datapack/joshs-more-foods' anotherSite>
          <GImg type='grid' imgs='one'>
            <Img src='/features/guides/food.webp' alt='Еда' pixel />
          </GImg>

          <GText>Еда</GText>
        </GLink>

        <GLink href='https://minecraft.wiki/w/Villager_Trade_Rebalance' anotherSite>
          <GImg type='grid' imgs='one'>
            <Img src='/features/guides/villager.png' alt='Житель' />
          </GImg>

          <GText>Жители</GText>
        </GLink>

        <GLink href='/features/guides/litematica'>
          <GImg type='grid' imgs='two'>
            <Img src='/features/guides/litematica/house.jpg' alt='Дом из мема: ОЙ МАМА ПРИШЛА' />
          </GImg>
          <GImg type='grid' imgs='two'>
            <Img src='/features/guides/blocks.png' alt='Блоки' />
          </GImg>

          <GText>Litematica</GText>
        </GLink>
      </GContainer>
    </MaxSize>
  )
}
