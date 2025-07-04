'use client'

import { ComponentPropsWithoutRef } from 'react'
import { DangerProps, FormButton } from './form'
import { useFormStatus } from 'react-dom'

interface HookButton extends ComponentPropsWithoutRef<'button'>, DangerProps {}

export const HookButton = ({ children, className = '', danger = false, ...props }: HookButton) => {
  const { pending } = useFormStatus()

  return (
    <FormButton className={className} danger={danger} isLoading={pending} {...props}>
      {children}
    </FormButton>
  )
}
