'use server'

import { unstable_cache as cache } from 'next/cache'
import { caseModel, dropModel, userModel } from '@db/models'
import { Case, Drop, Item, RarityType } from '@/types/case'
import { idOrName } from '@/types/idOrName'
import { Payment, PaymentWithUser } from '@/types/payment'
import { EasyDonateApiClient } from '@scondic/easydonate-sdk'
import { User } from 'lucia'

const easydonate = new EasyDonateApiClient(process.env.EASYDONATE_SECRET!)

export const getCaseLocal = cache(
  async (param: idOrName, Cases: Case[]) => {
    const Case = Cases.find(
      ({ name, _id }) => name === param.name || String(_id) === String(param._id)
    )

    if (!Case) {
      console.error(`Case не найден: ${JSON.stringify(param)}`)
    }

    return Case
  },
  ['case', 'shop', 'all'],
  { revalidate: 3600, tags: ['case', 'shop', 'all'] }
)

export const getCase = cache(
  async (param: idOrName) => {
    const Case: Case | null = JSON.parse(
      JSON.stringify(
        await caseModel.findOne(
          param,
          {},
          {
            lean: true,
          }
        )
      )
    )

    if (!Case) {
      throw new Error(`Case не найден: ${JSON.stringify(param)}`)
    }

    return Case
  },
  ['case', 'shop', 'all'],
  { revalidate: 3600, tags: ['case', 'shop', 'all'] }
)

export const getCases = cache(
  async (): Promise<Case[]> =>
    JSON.parse(
      JSON.stringify(
        await caseModel.find(
          {},
          {},
          {
            lean: true,
          }
        )
      )
    ),
  ['cases', 'shop', 'all'],
  { revalidate: 3600, tags: ['cases', 'shop', 'all'] }
)

export const getDropLocal = cache(
  async (param: idOrName, Drops: Drop[]) => {
    const Drop = Drops.find(
      ({ name, _id }) => name === param.name || String(_id) === String(param._id)
    )

    if (!Drop) {
      console.error(`Drop не найден: ${JSON.stringify(param)}`)
    }

    return Drop
  },
  ['drop', 'shop', 'all'],
  { revalidate: 3600, tags: ['drop', 'shop', 'all'] }
)

export const getDrop = cache(
  async (param: idOrName) => {
    const Drop: Drop | null = JSON.parse(
      JSON.stringify(
        await dropModel.findOne(
          param,
          {},
          {
            lean: true,
          }
        )
      )
    )

    if (!Drop) {
      throw new Error(`Drop не найден: ${JSON.stringify(param)}`)
    }

    return Drop
  },
  ['drop', 'shop', 'all'],
  { revalidate: 3600, tags: ['drop', 'shop', 'all'] }
)

export const getDrops = cache(
  async () => {
    const drops: Drop[] = JSON.parse(
      JSON.stringify(
        await dropModel.find(
          {},
          {},
          {
            lean: true,
            sort: { price: -1 },
          }
        )
      )
    )

    return drops
  },
  ['drops', 'shop', 'all'],
  { revalidate: 3600, tags: ['drops', 'shop', 'all'] }
)

export const getItems = cache(
  async (rarity: RarityType, DropItem?: Drop) => {
    if (!DropItem) return []
    let Items = DropItem?.drop
    if (Items?.length === 0) {
      Items = DropItem[rarity]
    }

    if (Items?.length === 0 || !Items) {
      console.error(`Items не найден`)
    }

    return Items || []
  },
  ['items', 'shop', 'all'],
  { revalidate: 3600, tags: ['items', 'shop', 'all'] }
)

export const getItem = cache(
  async (param: idOrName, Items: Item[]) => {
    if (Items.length === 0) {
      return Items[0]
    }

    const Item = Items.find(
      ({ _id, name }) => String(_id) === String(param._id) || name === param.name
    )

    if (!Item) {
      console.error(`Item не найден: ${JSON.stringify(param)}`)
    }

    return Item
  },
  ['item', 'shop', 'all'],
  { revalidate: 3600, tags: ['item', 'shop', 'all'] }
)

export const getAllPayments = cache(
  async (): Promise<PaymentWithUser[]> => {
    const data = await easydonate.getAllPaymentById(Number(process.env.EASYDONATE_MOSTIKIID!))
    const payments = data?.response as unknown as Payment[]

    const paymentsByNick: Payment[] = []

    payments
      .filter(payment => payment.payment_type !== 'test')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .forEach(payment => {
        const index = paymentsByNick.findIndex(p => p.customer === payment.customer)
        if (index === -1) {
          paymentsByNick.push(payment)
        } else {
          paymentsByNick[index].cost += payment.cost
          paymentsByNick[index].enrolled += payment.enrolled
          paymentsByNick[index].products.push(...payment.products)
        }
      })

    // Проверка существования пользователей
    const users = (await userModel.find({
      name: { $in: paymentsByNick.map(p => p.customer) },
    })) as User[]

    const paymentsByNickWithUser = paymentsByNick.map(p => {
      const user = users.find(u => u.name === p.customer)
      if (user) {
        return { ...p, user }
      }
    }).filter(Boolean) as PaymentWithUser[]

    return paymentsByNickWithUser
  },
  ['payments', 'shop', 'all'],
  { revalidate: 3600, tags: ['payments', 'shop', 'all'] }
)
