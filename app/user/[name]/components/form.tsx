import type {User} from "lucia";
import {userModel} from "@server/models";
import {FormClient} from "./formClient";
import {revalidateTag} from "next/cache";

const threeDays = 1000 * 60 * 60 * 24 * 3 // мс * с * мин * ч * д

export function FormBox({author}: { author: User | null }) {
	if (!author || author?.form === true) return

	const time = new Date(author.createdAt).getTime() - new Date().getTime()
	if (time > threeDays) return

	async function Func() {
		"use server"

		await userModel.findByIdAndUpdate(
				author!._id,
				{
					form: true
				}
		)

		revalidateTag("userLike")
	}

	return <FormClient Func={Func}/>
}