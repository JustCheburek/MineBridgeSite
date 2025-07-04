'use client'

import { useState } from 'react'
import { Drop, RarityNames } from '@/types/case'
import { SumChances } from '@/lib/utils'
import { Modal } from '@components/modal'
import { H1 } from '@components/h1'
import { CaseBox, type CaseBoxProps } from '@components/caseBox'

type CaseBoxWithModal = {
  Drops: Drop[]
} & CaseBoxProps

export function CaseBoxWithModal({
  Case,
  Drops,
  helper = true,
  children,
  ...props
}: CaseBoxWithModal) {
  const chancesRarity = SumChances(Case.rarity)
  const chancesDrop = SumChances(Case.drop)
  const [modal, setModal] = useState(false)

  return (
    <>
      <CaseBox Case={Case} helper={helper} onClick={() => setModal(true)} {...props}>
        {children}
      </CaseBox>
      <Modal modal={modal} setModal={setModal}>
        <H1>{Case.displayname}</H1>
        <div className='grid gap-16 md:grid-cols-2'>
          <div className='md:text-left'>
            <h2 className='text-unic mb-8'>Редкости</h2>
            {Case.rarity.map(rarity => {
              const translate = RarityNames[rarity.name]

              return (
                <p key={rarity.name}>
                  {translate} - {Math.round((rarity.chance / chancesRarity) * 1000) / 10}%
                </p>
              )
            })}
          </div>
          <div className='md:text-right'>
            <h2 className='text-unic mb-8'>Дроп</h2>
            {Case.drop.map(drop => {
              const Drop = Drops.find(({ name }) => name === drop.name)

              if (!Drop) {
                return <p key={drop.name}>Неизвестный дроп - {drop.name}</p>
              }

              return (
                <p key={drop.name}>
                  {Drop.displayname} - {Math.round((drop.chance / chancesDrop) * 1000) / 10}%
                </p>
              )
            })}
          </div>
        </div>
      </Modal>
    </>
  )
}
