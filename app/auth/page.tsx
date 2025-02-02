// React
import {validate} from "@services/validate";
import type {Metadata} from "next";
import {redirect} from "next/navigation";

// Компоненты
import {MaxSize} from "@components/maxSize";
import {AuthForm} from "./components";
import {cookies} from "next/headers";
import {H1} from "@components/h1";

export const metadata: Metadata = {
	title: "Регистрация",
	description: "Нужен лишь гугл, дискорд или твич и вы уже на сервере!"
};

export default async function Auth() {
	const cookiesStore = await cookies()
	const {user} = await validate()

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

				<AuthForm savedName={savedName}/>
			</MaxSize>
	)
}
