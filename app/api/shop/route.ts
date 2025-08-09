import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { PaymentPost } from '@/types/payment'
import { userModel } from '@db/models'
import { MostikiEmail } from '@email/mostiki'
import { Resend } from 'resend'

// Инициализация Resend (для почты)
const resend = new Resend(process.env.RESEND_API_KEY)

export function GET() {
  console.log(`GET запрос в /api/shop`)
  return NextResponse.json({ status: 'Error', message: "Only POST requests" })
}

// Обработчик POST-запросов
export async function POST(request: NextRequest) {
  console.log(request)

  // Получение данных из запроса
  const payment = (await request.json()) as PaymentPost

  console.log(payment)

  // Создание строки для подписи
  const hashString = [payment.payment_id, payment.cost, payment.customer].join('@')
  const expected = crypto
    .createHmac('sha256', process.env.EASYDONATE_SECRET!)
    .update(hashString)
    .digest('hex')

  // Проверка подписи
  if (expected !== payment.signature) {
    console.log(`Bad signature: ${expected}, ${payment.signature}`)
    return NextResponse.json({ error: 'Bad signature.' }, { status: 400 })
  }

  const mostiki = payment.products[0].count

  console.log(`Оплата! Ник: ${payment.customer}; Мостики: ${mostiki}`)

  // Добавление товара
  const user = await userModel.findOneAndUpdate({ name: payment.customer }, { $inc: { mostiki } })

  // Сообщение на почту
  if (user?.notifications?.mostiki) {
    await resend.emails.send({
      from: 'Майнбридж <mostiki@m-br.ru>',
      to: user.email,
      subject: 'Изменения в мостиках на MineBridge',
      react: MostikiEmail({ name: user.name, mostiki, allMostiki: user.mostiki + mostiki }),
    })
  }

  // Ответ
  return NextResponse.json({ status: 'OK' })
}
