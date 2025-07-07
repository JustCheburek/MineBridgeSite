'use client'

import { type Dispatch, type SetStateAction, useState } from 'react'
import { DangerProps, FormInput, type FormInputProps, FormLabel } from '@components/form'

type InputNameProps = FormInputProps & DangerProps
const InputName = ({ autoComplete = 'name', danger = false, ...props }: InputNameProps) => (
  <FormLabel danger={danger}>
    <FormInput
      placeholder='Майнкрафт никнейм'
      name='name'
      autoComplete={autoComplete}
      required
      maxLength={30}
      {...props}
    />
  </FormLabel>
)

type InputNameCheck = {
  name: string
  setName: Dispatch<SetStateAction<string>>
  setAccess?: Dispatch<SetStateAction<boolean>>
}

export const InputNameCheck = ({ name, setName, ...props }: InputNameCheck & InputNameProps) => {
  const [symbol, setSymbol] = useState('')

  return (
    <>
      {name.length > 30 && (
        <small>
          Ник <span className='text-red'>длинный</span> (макс:{' '}
          <strong className='text-red'>30</strong>)
        </small>
      )}
      {symbol && (
        <p>
          <strong className='text-unic'>{symbol}</strong> <small>— недопустимый символ</small>
        </p>
      )}
      <InputName
        value={name}
        onChange={e => {
          if (e.target.value.match(/[^a-zA-Z0-9-_]/)) {
            setSymbol(String(e.target.value))
          } else {
            setName(e.target.value)
            setSymbol('')
          }
        }}
        title='Ник'
        {...props}
      />
    </>
  )
}

export const InputNameCheckWithoutState = ({
  defaultName = '',
  ...props
}: {
  defaultName?: string
  setAccess?: Dispatch<SetStateAction<boolean>>
} & InputNameProps) => {
  const [name, setName] = useState(defaultName)
  return <InputNameCheck name={name} setName={setName} {...props} />
}
