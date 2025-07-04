'use client'

import { Form, FormGroup, FormInput, FormLabel } from '@components/form'
import { useChangeRadioState } from '@hooks/useChangeState'
import { HookButton } from '@components/hookbutton'

export type Who = 'person' | 'all'

export function SendEmailForm() {
  const [, , onChange, Check] = useChangeRadioState<Who>('person')

  //  action={SendEmail}

  return (
    <Form action=''>
      <FormGroup>
        <FormLabel>
          <FormInput
            type='radio'
            name='who'
            checked={Check('person')}
            onChange={onChange}
            value='person'
          />
          Человеку
        </FormLabel>
        <FormLabel>
          <FormInput
            type='radio'
            name='who'
            checked={Check('all')}
            onChange={onChange}
            value='all'
          />
          Всем
        </FormLabel>
      </FormGroup>
      <FormLabel>
        <FormInput name='name' placeholder='Кому' disabled={!Check('person')} required />
      </FormLabel>
      <HookButton>Отправить</HookButton>
    </Form>
  )
}
