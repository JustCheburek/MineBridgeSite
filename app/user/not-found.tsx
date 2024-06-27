import {MaxSize} from "@components/maxSize";
import {Url} from "@components/button";
import {validate} from "@services/validate";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";

export default async function NotFound() {
	const {user} = await validate(cookies().get(lucia.sessionCookieName)?.value)

	if (user) redirect(`/user/${user.name}`)

	return (
		<MaxSize className="center_text">
				<h1>А, кто это?</h1>
				<h3>Игрок не найден</h3>
				<Url href="/users">Посмотреть игроков</Url>
			</MaxSize>
	)
}