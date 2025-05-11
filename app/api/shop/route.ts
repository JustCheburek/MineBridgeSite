import {NextRequest, NextResponse} from 'next/server'
import crypto from 'crypto'
import {PaymentPost} from "@/types/payment";
import {userModel} from "@db/models";
import {MostikiEmail} from "@email/mostiki";
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    const payment = await request.json() as PaymentPost

    const hashString = [payment.payment_id, payment.cost, payment.customer].join('@')
    const expected = crypto
        .createHmac('sha256', process.env.EASYDONATE_SECRET!)
        .update(hashString)
        .digest('hex')

    if (expected !== payment.signature) {
        console.log(`Bad signature: ${expected}, ${payment.signature}`)
        return NextResponse.json({error: 'Bad signature.'}, {status: 400})
    }

    if (payment.payment_type === "test") {
        return NextResponse.json({status: 'OK'})
    }

    const mostiki = payment.cost

    const user = await userModel.findOneAndUpdate(
        {email: payment.email},
        {$inc: {mostiki}}
    )

    if (user?.notifications?.mostiki) {
        await resend.emails.send({
            from: 'Майнбридж <mostiki@m-br.ru>',
            to: user.email,
            subject: 'Изменения в мостиках на MineBridge',
            react: MostikiEmail(
                {name: user.name, mostiki, allMostiki: user.mostiki + mostiki}
            )
        })
    }

    return NextResponse.json({status: 'OK'})
}
