import { MaxSize } from '@components/maxSize'
import { H1 } from '@components/h1'
import { GLink, GContainer, GText } from '@components/grid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Админка',
}

export default async function AdminPanel() {
  return (
    <MaxSize className='grid place-items-center text-center'>
      <H1>Админка</H1>

      <GContainer className='grid-cols-autofit-[300px] gap-4 *:h-[60px] *:w-[300px]' border>
        <GLink href='/admin/whitelist'>
          <h3>Проходка</h3>
        </GLink>
        <GLink href='/admin/stars'>
          <h3>Звёзды</h3>
        </GLink>
        <GLink href='/admin/email'>
          <h3>Почта</h3>
        </GLink>
      </GContainer>
    </MaxSize>
  )
}
