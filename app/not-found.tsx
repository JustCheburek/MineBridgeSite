import { MaxSize } from '@components/maxSize'
import { Url } from '@components/button'
import { H1 } from '@components/h1'

export default function NotFound() {
  return (
    <MaxSize className='text-center'>
      <H1>А, где я?</H1>
      <h3>Кажется, я в мире майнкрафта!</h3>
      <Url href='/'>На главную</Url>
    </MaxSize>
  )
}
