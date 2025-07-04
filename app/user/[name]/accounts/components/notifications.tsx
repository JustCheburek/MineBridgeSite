'use client'

import { Form, FormInput, FormLabel } from '@components/form'
import type { User } from 'lucia'
import { UpdateNotification } from '@services/user/notification'
import { notificationsLabels } from '@/types/notification'
import { HookButton } from '@components/hookbutton'
import { ErrorMessage } from '@components/error'
import { useActionStateId } from '@/hooks/useActionStateId'

export function NotificationsForm({ user }: { user: User }) {
  const [state, formAction] = useActionStateId(UpdateNotification, {
    success: true,
    data: { _id: user._id },
  })

  return (
    <Form action={formAction}>
      {notificationsLabels.map(({ name, label }) => (
        <FormLabel key={name}>
          <FormInput
            type='checkbox'
            name={name}
            defaultChecked={user.notifications?.[name as keyof typeof user.notifications]}
          />
          {label}
        </FormLabel>
      ))}

      <ErrorMessage state={state} />

      <HookButton>Сохранить</HookButton>
    </Form>
  )
}
