'use client'

import { MostikiSvg } from '@ui/SVGS'
import { Form, FormInput, FormLabel } from '@components/form'
import { User } from '@/types/user'
import { CreateCode } from '@services/code/create'
import { UseCode } from '@services/code/use'
import { HookButton } from '@components/hookbutton'
import { ErrorMessage } from '@components/error'
import { useActionStateId } from '@/hooks/useActionStateId'

export const Create = ({ _id, mostiki }: { _id: User['_id']; mostiki: User['mostiki'] }) => {
  const [state, formAction] = useActionStateId(CreateCode, { success: true, data: { _id } })

  return (
    <Form action={formAction}>
      <p>
        Твой баланс: {mostiki} <MostikiSvg />
      </p>

      <FormLabel>
        <FormInput
          name='mostiki'
          type='number'
          placeholder='Мостики'
          min={1}
          max={mostiki}
          autoComplete='mostiki'
        />
      </FormLabel>

      <ErrorMessage state={state} />

      <HookButton>Сгенерировать</HookButton>
    </Form>
  )
}

export const Use = ({ _id }: { _id: User['_id'] }) => {
  const [state, formAction] = useActionStateId(UseCode, { success: true, data: { _id } })

  return (
    <Form action={formAction}>
      <FormLabel>
        <FormInput placeholder='Код' name='code' autoComplete='code' required />
      </FormLabel>

      <ErrorMessage state={state} />

      <HookButton>Использовать</HookButton>
    </Form>
  )
}
