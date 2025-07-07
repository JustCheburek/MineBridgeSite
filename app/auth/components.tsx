'use client'

import { FormA, Form, FormGroup, FormInput, FormLabel } from '@components/form'
import { InputNameCheck } from '@components/inputName'
import { DiscordSvg, GoogleSvg, TwitchSvg } from '@ui/SVGS'
import { useState } from 'react'
import { useChangeRadioState } from '@hooks/useChangeState'

export function AuthForm({ savedName }: { savedName?: string }) {
  const [name, setName] = useState(savedName ?? '')
  const [provider, , onChange, Check] = useChangeRadioState<'google' | 'discord' | 'twitch'>(
    'google'
  )

  return (
    <>
      <Form>
        <InputNameCheck name={name} setName={setName} autoFocus />

        <FormGroup>
          <FormLabel className='grid place-content-center'>
            <FormInput
              name='provider'
              type='radio'
              checked={Check('google')}
              onChange={onChange}
              value='google'
            />
            <GoogleSvg colorful className='size-[1em] scale-150' />
          </FormLabel>

          <FormLabel className='grid place-content-center'>
            <FormInput
              name='provider'
              type='radio'
              checked={Check('discord')}
              onChange={onChange}
              value='discord'
            />
            <DiscordSvg colorful className='size-[1em] scale-[2]' />
          </FormLabel>

          <FormLabel className='grid place-content-center'>
            <FormInput
              name='provider'
              type='radio'
              checked={Check('twitch')}
              onChange={onChange}
              value='twitch'
            />
            <TwitchSvg colorful className='size-[1em] scale-[1.85]' />
          </FormLabel>
        </FormGroup>

        <FormA href={`/auth/${provider}?name=${name}`}>Дальше</FormA>
      </Form>
    </>
  )
}
