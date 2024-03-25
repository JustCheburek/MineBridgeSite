// React
import {validate} from "@server/validate";
import type {Metadata} from "next";
import {permanentRedirect, redirect, RedirectType} from "next/navigation";

// Стили
import './styles/auth.scss';

// Svgs
import {DiscordSvg, GoogleSvg} from "@ui/svgs";
import {FormButton, FormGroup, FormLabel} from "@components/form";
import {MaxSize} from "@components/maxSize";
import {cookies} from "next/headers";

export const metadata: Metadata = {
	title: "Регистрация | Майнбридж",
	description: "Нужен лишь гугл или дискорд и вы уже на сервере!",
};

export default async function Auth() {
	const {user} = await validate()

	if (user) {
		return redirect(`/user/${user.name}`)
	}

	const name = cookies().get("name")?.value || ""

	async function authProvider(formData: FormData) {
		"use server";

		const month = 60 * 60 * 24 * 30;

		cookies().set("name", formData.get("name") as string, {
			path: "/",
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			maxAge: month,
			sameSite: "lax"
		})

		permanentRedirect(`/auth/${formData.get("provider")}`, RedirectType.push);
	}

	return (
			<main className="auth">
				<MaxSize className="center_text grid_center">
					<h1>Вход</h1>
					<p>
						Вы уже близко к цели!
					</p>

					<form className="form" action={authProvider}>
						<FormLabel>
							<input
									type="text"
									placeholder="Майнкрафт никнейм"
									name="name"
									autoComplete="name"
									required
									minLength={4}
									maxLength={20}
									autoFocus
									defaultValue={name}
							/>
						</FormLabel>

						<FormGroup>
							<FormLabel>
								<input
										type="radio"
										name="provider"
										autoComplete="provider"
										defaultChecked
										value="discord"
								/>
								<DiscordSvg className="color" width="1em" height="1em"/>
							</FormLabel>

							<FormLabel>
								<input
										type="radio"
										name="provider"
										autoComplete="provider"
										value="google"
								/>
								<GoogleSvg width="1em" height="1em"/>
							</FormLabel>
						</FormGroup>

						<FormButton>
							Погнали
						</FormButton>
					</form>
				</MaxSize>
			</main>
	)
}
