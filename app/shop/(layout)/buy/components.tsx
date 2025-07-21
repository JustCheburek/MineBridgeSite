'use client'

import { Form, FormInput, FormLabel } from '@components/form'
import { User } from 'lucia'
import { useUrlState } from 'state-in-url'
import { HookButton } from '@components/hookbutton'
import { ErrorMessage } from '@components/error'
import { useActionStateId } from '@/hooks/useActionStateId'
import { CreatePaymentLink, Url } from '@services/user/payments/createLink'
import { useEffect } from 'react'

export function PaymentForm({ user }: { user: User }) {
  const {
    urlState: { mostiki, code },
    setUrl,
  } = useUrlState({
    mostiki: 1,
    code: '',
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
            setUrl({ mostiki: Number(e.target.value) })
          }}
        />
      </FormLabel>

      <FormLabel>
        <FormInput
          name='promocode'
          type='text'
          placeholder='Промокод'
          autoComplete='promocode'
          value={code}
          onChange={e => {
            setUrl({ code: e.target.value })
          }}
        />
      </FormLabel>

      <ErrorMessage state={state} />

      <HookButton disabled={mostiki < 1}>Купить</HookButton>
    </Form>
  )
}
