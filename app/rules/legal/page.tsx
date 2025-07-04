import type { Metadata } from 'next'
import { H1 } from '@components/h1'
import { GLink, GContainer, GText } from '@components/grid'

export const metadata: Metadata = {
  title: 'Политики',
  description: 'Политики использования сайта',
}

export default function Rules() {
  return (
    <>
      <div className='rules_content'>
        <H1>Политики</H1>

        <GContainer border className='grid-cols-autofit-[500px] gap-4 *:h-[100px] *:w-[500px]'>
          <GLink href='/rules/legal/terms-of-use'>
            <GText center>Пользовательское соглашение</GText>
          </GLink>

          <GLink href='/rules/legal/privacy-policy'>
            <GText center>Политика конфиденциальности</GText>
          </GLink>

          <GLink href='/rules/legal/refund-policy'>
            <GText center>Политика возврата средств</GText>
          </GLink>
        </GContainer>
      </div>
    </>
  )
}
