'use client'

// Компоненты
import { Modal, type ModalAction } from '@components/modal'
import { Form, FormLink } from '@components/form'
import { HookButton } from '@components/hookbutton'
import type { User } from 'lucia'
import { MostikiSvg, StarSvg } from '@ui/SVGS'
import { BuyPass } from '@services/user/payments/pass'
import { ErrorMessage } from '@components/error'
import { useActionStateId } from '@/hooks/useActionStateId'
import { cn, GetMostiki } from '@/lib/utils'

type BuyModal = {
  author: User
  months: number
  faded_rating: number
} & ModalAction

export const BuyModal = ({ author, faded_rating, months, modal, setModal }: BuyModal) => {
  const mostiki = GetMostiki(months, faded_rating)
  const [state, formAction] = useActionStateId(BuyPass, {
    success: true,
    data: { _id: author._id },
  })

  return (
    <Modal setModal={setModal} modal={modal}>
      <h1>Проходка</h1>
      <Form action={formAction} onSubmit={() => state.success && setModal(false)}>
        <input type='hidden' name='months' value={months} />
        <input type='hidden' name='faded_rating' value={faded_rating} />
        <div>
          <p>
            Твой баланс:{' '}
            <span className='text-unic'>
              {author.mostiki} <MostikiSvg />
            </span>
          </p>
          <p>
            Стоимость:{' '}
            <span className={cn(mostiki > author.mostiki ? 'text-red' : 'text-unic')}>
              {mostiki} <MostikiSvg />
            </span>
          </p>
        </div>
        <div>
          <p>
            Погасшие:{' '}
            <span className='text-faded'>
              {author.faded_rating} <StarSvg className='text-faded' />
            </span>
          </p>
          <p>
            Тратишь:{' '}
            <span className={cn(faded_rating > author.faded_rating ? 'text-red' : 'text-faded')}>
              {faded_rating}{' '}
              <StarSvg
                className={cn(faded_rating > author.faded_rating ? 'text-red' : 'text-faded')}
              />
            </span>
          </p>
        </div>
        <div>
          <p>После покупки ты получишь</p>
          <p className='text-unic font-semibold'>{months * 30} дней проходки</p>
        </div>

        <ErrorMessage state={state} />

        <BuyButton author={author} mostiki={mostiki} faded_rating={faded_rating} />
      </Form>
    </Modal>
  )
}

function BuyButton({
  author,
  mostiki,
  faded_rating,
}: {
  author: User
  mostiki: number
  faded_rating: number
}) {
  if (author.mostiki < mostiki) {
    return (
      <FormLink href={`/shop/buy?mostiki=${mostiki - author.mostiki}`}>Пополнить баланс</FormLink>
    )
  }

  if (faded_rating > author.faded_rating) {
    return <HookButton disabled>Нет звёзд</HookButton>
  }

  return <HookButton>Купить</HookButton>
}
