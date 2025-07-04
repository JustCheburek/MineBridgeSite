'use client'

import { Form, FormGroup, FormInput, FormLabel } from '@components/form'
import { type ChangeEvent, useState } from 'react'

type InviteLink = {
  name: string
}

export function InviteLink({ name }: InviteLink) {
  const [from, setFrom] = useState('friend')

  const places = {
    friend: 'Друг',
    youtube: 'Ютуб',
    twitch: 'Твич',
    discord: 'Дискорд',
    vk: 'ВК',
    telegram: 'Телеграм',
  }

  const placesList = Object.keys(places) as (keyof typeof places)[]

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFrom(event.target.value)
  }

  return (
    <Form action=''>
      <FormGroup>
        {placesList.map(place => (
          <FormLabel key={place} className='text-center'>
            <FormInput
              name='place'
              type='radio'
              value={place}
              onChange={onChange}
              checked={from === place}
            />
            {places[place]}
          </FormLabel>
        ))}
      </FormGroup>
      <p className='text-unic select-all break-all'>
        {process.env.NEXT_PUBLIC_EN_URL}/invite/{name}/{from}
      </p>
    </Form>
  )
}
