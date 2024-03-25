// React
import {validate} from "@server/validate";
import type {Metadata} from "next";
import {redirect} from "next/navigation";

// Svgs
import {MaxSize} from "@components/maxSize";
import {AuthForm} from "@app/auth/components";

export const metadata: Metadata = {
	title: "Регистрация | Майнбридж",
	description: "Нужен лишь гугл или дискорд и вы уже на сервере!",
};

export default async function Auth() {
	const {user} = await validate()

	if (user) {
		return redirect(`/user/${user.name}`)
	}

	return (
			<main className="auth">
				<MaxSize className="center_text grid_center">
					<h1>Вход</h1>
					<p>
						Вы уже близко к цели!
					</p>

					<AuthForm/>
				</MaxSize>
			</main>
	)
}
