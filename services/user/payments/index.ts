'use server'
import { Payment, PaymentWithUser } from '@/types/payment'
import { EasyDonateApiClient } from '@scondic/easydonate-sdk'
import { unstable_cache as cache } from 'next/cache'
import { userModel } from '@db/models'
import { User } from 'lucia'

const easydonate = new EasyDonateApiClient(process.env.EASYDONATE_SECRET!)

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
    }, {
      name: 1,
      photo: 1
    })) as User[]

    const paymentsByNickWithUser = paymentsByNick
      .map(p => {
        const user = users.find(u => u.name === p.customer)
        if (user) {
          return { ...p, user }
        }
      })
      .filter(Boolean) as PaymentWithUser[]

    return paymentsByNickWithUser
  },
  ['payments', 'shop', 'all'],
  { revalidate: 3600, tags: ['payments', 'shop', 'all'] }
)
