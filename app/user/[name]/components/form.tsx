import type {User} from "lucia";
import {userModel} from "@server/models";
import {FormClient} from "./formClient";
import {revalidateTag} from "next/cache";
import {redirect} from "next/navigation";

// мс * с * мин * ч * д
const threeDays = 1000 * 60 * 60 * 24 * 3

export function FormBox({author}: { author: User | null }) {
	if (!author) return
	if (author?.form === true) return

	const time = new Date().getTime() - new Date(author.createdAt).getTime()
	if (time < threeDays) return

	async function Func() {
		"use server"

		await userModel.findByIdAndUpdate(author!._id, {form: true})
		revalidateTag("userLike")

		redirect(`https://forms.yandex.ru/u/6638c564f47e731e00d9e6e1/`)
	}

	return <FormClient Func={Func}/>
}