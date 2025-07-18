'use client'

import { Form, FormInput, FormLabel } from '@components/form'
import { User } from 'lucia'
import { useUrlState } from 'state-in-url'
import { HookButton } from '@components/hookbutton'
import { ErrorMessage } from '@components/error'
import { useActionStateId } from '@/hooks/useActionStateId'
import { CreatePaymentLink, Url } from '@services/user/payment'
import { useEffect } from 'react'

export function PaymentForm({ user }: { user: User }) {
  const {
    urlState: { mostiki },
    setUrl: setMostiki,
  } = useUrlState({
    mostiki: 1,
  })

  const [state, formAction] = useActionStateId<Url>(CreatePaymentLink, {
    success: true,
    data: { _id: user._id },
  })

  useEffect(() => {
    if (state.success && state.data.url) {
      window.location.href = state.data.url
    }
  }, [state.success, state.data.url])

  return (
    <Form action={formAction}>
      <FormLabel>
        <FormInput
          name='mostiki'
          type='number'
          placeholder='Мостики'
          min={1}
          autoComplete='mostiki'
          value={mostiki}
          onChange={e => {
            const value = Number(e.target.value)
            setMostiki({ mostiki: value })
          }}
        />
      </FormLabel>

      <ErrorMessage state={state} />

      <HookButton disabled={mostiki < 1}>Купить</HookButton>
    </Form>
  )
}
