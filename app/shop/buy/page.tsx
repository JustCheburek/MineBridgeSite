// Сервер
import axios from "axios";
import type {Metadata} from "next";
import {permanentRedirect, redirect} from "next/navigation";
import {validate} from "@services/validate";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";

// Компоненты
import {BuyForm} from "./components";

export const metadata: Metadata = {
	title: "Покупка | MineBridge",
	description: "Покупка мостиков с помощью СБП. 1₽ = 1 мостик. Подержите нас донатиком, пж!",
};

export default async function Component() {
	const {user} = await validate(cookies().get(lucia.sessionCookieName)?.value)

	if (!user) {
		return permanentRedirect("/auth")
	}

	async function Buy(formData: FormData) {
		"use server"

		const total = formData.get("total")?.toString()
		const coupon = formData.get("coupon")?.toString()

		if (!total || !user?.name) {
			throw new Error(`Не достаточно аргументов`)
		}

		const url = new URL(`https://api.trademc.org/shop.buyItems`)
		url.searchParams.set("buyer", user?.name)
		url.searchParams.set("items", `1:${total}`)
		coupon && url.searchParams.set("coupon", coupon)
		url.searchParams.set("v", "3")

		type ResponceBuy = {
			response: {
				total: number
				cart_id: number
			}
		}

		const responce = await axios.get<ResponceBuy>(
				url.href
		).then(r => r.data)

		if (!responce) {
			throw new Error(`Нет ответа`)
		}

		const buyUrl = new URL(`https://pay.trademc.org`)

		const {cart_id} = responce.response
		buyUrl.searchParams.set("cart_id", cart_id.toString())
		buyUrl.searchParams.set("success_url", `${process.env.NEXT_PUBLIC_URL}/shop`)
		buyUrl.searchParams.set("pending_url", `${process.env.NEXT_PUBLIC_URL}/shop`)
		buyUrl.searchParams.set("fail_url", `${process.env.NEXT_PUBLIC_URL}/shop`)

		redirect(buyUrl.href)
	}

	return <BuyForm Buy={Buy}/>
}
