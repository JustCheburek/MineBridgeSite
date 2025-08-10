'use client'

import { ToStars } from '@services/user/hours/toStars'
import { Form, FormButton } from '@components/form'
import { ErrorMessage } from '@components/error'
import { useActionStateId } from '@/hooks/useActionStateId'
import { StarSvg } from '@ui/SVGS'

export function GetStarsForm({ _id, stars }: { _id: string, stars: number }) {
  const [state, formAction] = useActionStateId(ToStars, { success: true, data: { _id } })

  return (
    <Form action={formAction}>
      <ErrorMessage state={state} />

      <FormButton className='my-8'>Получить {stars} <StarSvg/></FormButton>
    </Form>
  )
}
