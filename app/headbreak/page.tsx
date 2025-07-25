import { Metadata } from 'next'
import { MaxSize } from '@components/maxSize'
import { H1 } from '@components/h1'
import { HeadBreakBox } from './components'

export const metadata: Metadata = {
  title: 'Головоломка',
  description: 'Довольно сложная головоломка. Лор 7 сезон.',
  robots: {
    index: false,
  },
}

export default async function HeadBreak() {
  return (
    <MaxSize className='grid place-items-center'>
      <H1>Головоломка</H1>

      <HeadBreakBox />
    </MaxSize>
  )
}
