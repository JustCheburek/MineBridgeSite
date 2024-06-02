// React
import {validate} from "@services/validate";
import type {Metadata} from "next";
import {redirect} from "next/navigation";

// Компоненты
import {MaxSize} from "@components/maxSize";
import {AuthForm} from "./components";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";

export const metadata: Metadata = {
	title: "Регистрация | Майнбридж",
	description: "Нужен лишь гугл или дискорд и вы уже на сервере!",
};

export default async function Auth() {
	const {user} = await validate(cookies().get(lucia.sessionCookieName)?.value)

	if (user) {
		return redirect(`/user/${user.name}`)
	}

	const savedName = cookies().get("name")?.value

	return (
			<main className="auth">
				<MaxSize className="center_text grid_center">
					<h1>Вход</h1>
					<p>
						Вы уже близко к цели!
					</p>

					<AuthForm savedName={savedName}/>
				</MaxSize>
			</main>
	)
}
