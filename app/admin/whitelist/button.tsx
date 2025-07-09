'use client'

import { useState } from 'react'
import type { User } from 'lucia'
import { Button } from '@components/button'
import { WhitelistModal } from '@ui/components/modals/whitelist'

export function WhitelistReset({ users }: { users: User[] }) {
  const [modal, setModal] = useState(false)
  if (!users.length) return null
  return (
    <>
      <Button danger onClick={() => setModal(true)} className='mb-[16px]'>
        Сбросить
      </Button>
      <WhitelistModal modal={modal} setModal={setModal} />
    </>
  )
}
