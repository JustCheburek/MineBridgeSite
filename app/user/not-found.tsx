import {MaxSize} from "@components/maxSize";
import {Url} from "@components/button";
import {validate} from "@services/validate";
import {redirect} from "next/navigation";

export default async function NotFound() {
	const {user} = await validate()

	if (user) redirect(`/user/${user.name}`)

	return (<>
		<main>
			<MaxSize className="center_text">
				<h1>А, кто это?</h1>
				<h3>Игрок не найден</h3>
				<Url href="/users">Посмотреть игроков</Url>
			</MaxSize>
		</main>
	</>)
}