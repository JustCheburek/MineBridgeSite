"use server"

import {User} from "lucia";
import {EasyDonateApiClient} from "@scondic/easydonate-sdk";
import {redirect} from "next/navigation";

const easydonate = new EasyDonateApiClient(process.env.EASYDONATE_SECRET!);

export async function CreatePaymentLink(mostiki: number, user: User) {
    const payment = await easydonate.getPaymentLink(
        user.name,
        Number(process.env.EASYDONATE_SERVERID!),
        {[Number(process.env.EASYDONATE_MOSTIKIID!)]: mostiki},
        new URL("/shop/buy/success", process.env.NEXT_PUBLIC_EN_URL!).toString(),
        user.email
    )

    redirect(payment.response.url)
}