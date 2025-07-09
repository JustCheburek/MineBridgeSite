'use client'

import { useEffect } from 'react'
import { MaxSize } from '@components/maxSize'
import { Button, Url } from '@components/button'
import { H1 } from '@components/h1'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <MaxSize className='text-center'>
      <H1 up={false}>{error.name}</H1>
      <h3>{error.message}</h3>
      <Button onClick={() => reset()}>Перезагрузить</Button>
      <Url href='/'>На главную</Url>
    </MaxSize>
  )
}
