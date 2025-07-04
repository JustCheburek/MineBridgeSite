import { SubsectionItem, Subsections } from '@components/sideNav'
import { MaxSize } from '@components/maxSize'
import { PropsWithChildren } from 'react'

export default function Shop({ children }: PropsWithChildren) {
  return (
    <div className='from-background bg-gradient-to-b from-30% to-black'>
      <MaxSize sideNav>
        <Subsections menu='Меню магазина'>
          <SubsectionItem href='/shop'>Магазин</SubsectionItem>
          <SubsectionItem href='/shop/buy' exact={false}>
            Покупка
          </SubsectionItem>
          <SubsectionItem href='/shop/code'>Коды</SubsectionItem>
          <SubsectionItem href='/shop/case'>Кейсы</SubsectionItem>
          <SubsectionItem href='/shop/drop' exact={false}>
            Дроп
          </SubsectionItem>
        </Subsections>

        {children}
      </MaxSize>
    </div>
  )
}
