'use client'

import { AddSuffix, DropSuffix, SelectSuffix } from '@services/user/suffix'
import { DeleteCasePurchase, GetCosmetics } from '@services/user/casePurchase'
import { useState } from 'react'
import type { User } from 'lucia'
import { Case, Drop } from '@/types/case'
import type { CaseData, MultiCaseData } from '@/types/purchase'
import { CasesPurchasesModal } from '@modals/casesPurchases'
import { Form, FormInput, FormLabel } from '@components/form'
import { Img, ImgBox } from '@components/img'
import Link from 'next/link'
import { DeleteSvg } from '@ui/SVGS'
import { CaseBox } from '@components/caseBox'
import { Url } from '@components/button'
import { HookButton } from '@components/hookbutton'
import { cn } from '@/lib/utils'

type Select = {
  selected: boolean
  _id: string
  name: string
  suffix: string
}
function Select({ selected, _id, name, suffix }: Select) {
  if (selected) {
    return (
      <form
        action={() => DropSuffix(_id, name)}
        className='absolute bottom-[0.6rem] right-[1.4rem]'
      >
        <button>
          <small>убрать</small>
        </button>
      </form>
    )
  }

  return (
    <form
      action={() => SelectSuffix(suffix, _id, name)}
      className='absolute bottom-[0.6rem] right-[1.4rem]'
    >
      <button>
        <small>выбрать</small>
      </button>
    </form>
  )
}

type Suffix = {
  _id: string
  name: string
  isMe: boolean
  suffix: CaseData['suffix']
  index: number
  selected: boolean
}
function Suffix({ _id, name, isMe, suffix, index, selected }: Suffix) {
  if (suffix) {
    return (
      <>
        <p>{suffix}</p>

        {isMe && <Select selected={selected} suffix={suffix} _id={_id} name={name} />}
      </>
    )
  }

  if (!isMe) {
    return <p>Суффикс</p>
  }

  return (
    <Form action={(formData: FormData) => AddSuffix(formData, _id, name, index)} className='m-0'>
      <FormLabel>
        <FormInput name='name' placeholder='Суффикс (не меняется)' maxLength={15} required />
      </FormLabel>
      <HookButton>Сохранить</HookButton>
    </Form>
  )
}

type CasesPurchasesSection = {
  caseDatas: Partial<MultiCaseData>[]
  access: boolean
  isMe: boolean
  user: User
  Cases: Case[]
  Drops: Drop[]
}

export default function CasesPurchasesSection({
  caseDatas,
  access,
  isMe,
  Cases,
  Drops,
  user,
}: CasesPurchasesSection) {
  const [click, setClick] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)

  return (
    <section>
      <div className='text-center'>
        <h2>Покупки кейсов</h2>
        <p className='mt-2'>
          <code>/uc menu</code> для использования косметики
        </p>
      </div>

      {(isMe || access) && caseDatas.length > 0 && (
        <Form action={() => GetCosmetics(user.name, caseDatas)}>
          <HookButton disabled={click} onClick={() => setClick(true)}>
            {click ? 'Проверьте покупки' : 'Получить покупки'}
          </HookButton>
        </Form>
      )}

      <div className='flex flex-wrap justify-center gap-6'>
        {caseDatas.map(({ MultiCase, Drop, DropItem, rarity, Item, suffix }, index) => (
          <div
            className={cn(
              'rounded-input bg-gray group relative grid h-[160px] w-[280px] place-items-center overflow-hidden',
              'box',
              rarity
            )}
            key={index}
          >
            {DropItem?.name === 'suffix' ? (
              <Suffix
                _id={user._id}
                name={user.name}
                isMe={isMe}
                suffix={suffix}
                index={index}
                selected={user.suffix === suffix}
              />
            ) : (
              <ImgBox hover className='h-[160px] w-[280px]'>
                <Img
                  src={`/shop/${DropItem?.name}/${Item?.name}.webp`}
                  alt={Item?.displayname || DropItem?.name || ''}
                />
              </ImgBox>
            )}

            {MultiCase && DropItem?.name !== 'suffix' && (
              <div className='absolute right-[1.4rem] top-[0.6rem] flex items-center justify-center gap-1'>
                {MultiCase.map(
                  ({ Case, amount }) =>
                    Case && (
                      <Link
                        href={`/shop/drop/${Case?.name}/${Drop?.name}/${DropItem?.name}/${rarity}/${Item?.name}`}
                        key={Case?.name}
                      >
                        <CaseBox Case={Case} className='size-[40px]'>
                          {amount > 1 && (
                            <p
                              className={cn('absolute bottom-[-0.2em] right-[0.1em] font-semibold')}
                            >
                              {amount}
                            </p>
                          )}
                        </CaseBox>
                      </Link>
                    )
                )}
              </div>
            )}

            {access && (
              <div className='absolute left-[1.4rem] top-[0.6rem] flex items-center justify-center gap-1'>
                <form
                  action={() => {
                    DeleteCasePurchase(user._id, Item?._id, suffix)
                  }}
                >
                  <button className='helper_box danger'>
                    <DeleteSvg className='size-[1.3rem]' />
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>

      {access && (
        <Form action={() => setModal(true)}>
          <HookButton>Добавить</HookButton>
        </Form>
      )}

      <Url href='/shop/case' className='mt-[3rem]'>
        Купить
      </Url>

      {access && (
        <CasesPurchasesModal
          modal={modal}
          setModal={setModal}
          Cases={Cases}
          Drops={Drops}
          _id={user._id}
          access={access}
        />
      )}
    </section>
  )
}
