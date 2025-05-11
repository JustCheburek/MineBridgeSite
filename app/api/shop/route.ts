import {NextRequest, NextResponse} from 'next/server'
import crypto from 'crypto'
import {PaymentPost} from "@/types/payment";
import {userModel} from "@db/models";

export async function POST(request: NextRequest) {
    const payment = await request.json() as PaymentPost

    console.log(payment)

    const hashString = [payment.payment_id, payment.cost, payment.customer].join('@')
    const expected = crypto
        .createHmac('sha256', process.env.EASYDONATE_SECRET!)
        .update(hashString)
        .digest('hex')

    if (expected !== payment.signature) {
        console.log(`Bad signature: ${expected}, ${payment.signature}`)
        return NextResponse.json({error: 'Bad signature.'}, {status: 400})
    }

    await userModel.findOneAndUpdate(
        {name: payment.customer},
        {$inc: {mostiki: payment.cost}}
    )

    return NextResponse.json({status: 'OK'})
}
