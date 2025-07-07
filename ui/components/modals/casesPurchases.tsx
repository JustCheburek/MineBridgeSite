'use client'

import { type ChangeEvent, useEffect, useState } from 'react'
import { Case, Drop, Item, RarityNames, rarityNames } from '@/types/case'
import { CaseData } from '@/types/purchase'
import { AddCasePurchase } from '@services/user/casePurchase'

// Компоненты
import { Modal, type setModal } from '@components/modal'
import { Form, FormInput, FormLabel, FormSelect } from '@components/form'
import { H1 } from '@components/h1'
import { valueOf } from '@/types/valueOf'
import { HookButton } from '../hookbutton'

type CasesPurchasesModal = {
  Cases: Case[]
  Drops: Drop[]
  _id: string
  modal: boolean
  setModal: setModal
  access: boolean
}

export const CasesPurchasesModal = ({
  Cases,
  Drops,
  _id,
  modal,
  setModal,
}: CasesPurchasesModal) => {
  const [caseData, setCaseData] = useState<CaseData>({
    Case: Cases[0],
    Drop: Drops[0],
    DropItem: Drops[1], // 0 - all drop
    rarity: 'common',
    Item: Drops[1].common![0],
    suffix: '',
  })

  const defRarity = caseData.DropItem.defaultRarity

  const updateData = (key: keyof CaseData, value: valueOf<CaseData>) => {
    if (!!value) {
      setCaseData(prev => ({
        ...prev,
        [key]: value,
      }))
    }
  }

  const updateSuffix = (suffix = '') => {
    setCaseData(prev => ({
      ...prev,
      suffix,
    }))
  }

  function FindByEvent(Element: Case[] | Drop[] | Item[], e: ChangeEvent<HTMLSelectElement>) {
    return Element.find(Element => Element.name === e.target.value)
  }

  useEffect(() => {
    const Drop = caseData.Drop?.name
    if (Drop !== 'all') {
      updateData('DropItem', caseData.Drop)
    }
  }, [caseData.Drop?.name])

  useEffect(() => {
    const defRarity = caseData.DropItem?.defaultRarity
    if (defRarity) {
      updateData('rarity', defRarity)
    }
    updateSuffix()
  }, [caseData.DropItem?.name])

  useEffect(() => {
    updateData(
      'Item',
      defRarity ? caseData.DropItem.drop![0] : caseData.DropItem[caseData.rarity]![0]
    )
  }, [caseData.rarity, caseData.DropItem?.name])

  return (
    <Modal setModal={setModal} modal={modal}>
      <h1>Кейсы</h1>

      <Form
        action={() => {
          setModal(false)
          AddCasePurchase(_id, caseData)
        }}
      >
        <h2>Кейс</h2>
        <h3>Редкость</h3>
        <FormSelect
          className='text-center'
          onChange={e => {
            updateData('Case', FindByEvent(Cases, e))
          }}
        >
          {Cases.map(Case => (
            <option value={Case.name} key={Case.name}>
              {Case.displayname}
            </option>
          ))}
        </FormSelect>
        <h3>Дроп</h3>
        <FormSelect
          className='text-center'
          onChange={e => {
            updateData('Drop', FindByEvent(Drops, e))
          }}
        >
          {Drops.map(Drop => (
            <option value={Drop.name} key={Drop.name}>
              {Drop.displayname}
            </option>
          ))}
        </FormSelect>

        <h2>Предмет</h2>
        <h3>Дроп</h3>
        <FormSelect
          className='text-center'
          onChange={e => {
            updateData('DropItem', FindByEvent(Drops, e))
          }}
        >
          {caseData.Drop?.name !== 'all' ? (
            <option>{caseData.DropItem?.displayname}</option>
          ) : (
            Drops.filter(Drop => Drop.name !== 'all').map(Drop => (
              <option value={Drop.name} key={Drop.name}>
                {Drop.displayname}
              </option>
            ))
          )}
        </FormSelect>
        <h3>Редкость</h3>
        <FormSelect
          className='text-center'
          onChange={e => {
            updateData('rarity', e.target.value)
          }}
        >
          {defRarity ? (
            <option>{RarityNames[caseData.rarity]}</option>
          ) : (
            rarityNames.map(rarity => (
              <option value={rarity} key={rarity}>
                {RarityNames[rarity]}
              </option>
            ))
          )}
        </FormSelect>
        <h3>Предмет</h3>
        <FormSelect
          className='text-center'
          onChange={e => {
            updateData(
              'Item',
              defRarity
                ? FindByEvent(caseData.DropItem.drop!, e)
                : FindByEvent(caseData.DropItem[caseData.rarity]!, e)
            )
          }}
        >
          {defRarity
            ? // Без редкости
              caseData.DropItem.drop!.map(item => (
                <option value={item.name} key={item.name}>
                  {item.displayname}
                </option>
              ))
            : // С редкостью
              caseData.DropItem[caseData.rarity]!.map(item => (
                <option value={item.name} key={item.name}>
                  {item.displayname}
                </option>
              ))}
        </FormSelect>

        <h3>Суффикс</h3>
        <FormLabel>
          <FormInput
            name='suffix'
            placeholder='Суффикс'
            disabled={caseData.DropItem.name !== 'suffix'}
            value={caseData.suffix}
            onChange={e => updateSuffix(e.target.value)}
          />
        </FormLabel>

        <HookButton>Добавить</HookButton>
      </Form>
    </Modal>
  )
}
