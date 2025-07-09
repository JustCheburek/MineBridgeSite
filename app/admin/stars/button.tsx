'use client'

import { useState } from 'react'
import { Button } from '@components/button'
import { StarsModal } from '@modals/stars'

export function StarsReset() {
  const [modal, setModal] = useState(false)
  return (
    <>
      <Button danger onClick={() => setModal(true)} className='mb-[16px]'>
        Погасить
      </Button>
      <StarsModal modal={modal} setModal={setModal} />
    </>
  )
}
