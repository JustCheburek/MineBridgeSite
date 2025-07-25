'use client'

import { Button } from '@components/button'
import { Form } from '@components/form'
import { GetStars } from '@services/user/stars/get'

export function GetStarsForm({ _id }: { _id: string }) {
  return (
    <Form action={() => GetStars(_id)}>
      <Button className='my-8'>Получить звёзды</Button>
    </Form>
  )
}
