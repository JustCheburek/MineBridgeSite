// React
import {validate} from "@services/validate";
import type {Metadata} from "next";
import {redirect} from "next/navigation";

// Компоненты
import {MaxSize} from "@components/maxSize";
import {AuthForm} from "./components";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";
import {H1} from "@components/h1";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Регистрация",
	description: "Нужен лишь гугл или дискорд и вы уже на сервере!",
	openGraph: {
		title: "Регистрация",
		description: "Нужен лишь гугл или дискорд и вы уже на сервере!",
	},
	twitter: {
		title: "Регистрация",
		description: "Нужен лишь гугл или дискорд и вы уже на сервере!",
	}
};

export default async function Auth() {
	const cookiesStore = await cookies()
	const {user} = await validate(cookiesStore.get(lucia.sessionCookieName)?.value)

	if (user) {
		return redirect(`/user/${user.name}`)
	}

	const savedName = cookiesStore.get("name")?.value

	return (
			<MaxSize className="center_text grid_center">
				<H1>Введи ник</H1>
				<p>
					Вы уже близко к цели!
				</p>
				<Link href="/features/guides/auth" className="unic_color">
					Подробный гайд по входу
				</Link>

				<AuthForm savedName={savedName}/>
			</MaxSize>
	)
}
