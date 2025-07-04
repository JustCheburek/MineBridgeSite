'use client'
import { MaxSize } from '@components/maxSize'
import { Url, Button } from '@components/button'
import { H1 } from '@components/h1'

export default function NotFound() {
  return (
    <MaxSize className='text-center'>
      <H1>Код не найден</H1>
      <Button onClick={() => location.reload()}>Перезагрузка</Button>
    </MaxSize>
  )
}
