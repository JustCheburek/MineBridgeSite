import {MaxSize} from "@components/maxSize";
import {Url} from "@components/button";
import {validate} from "@services/validate";
import {redirect} from "next/navigation";
import {lucia} from "@server/lucia";
import {H1} from "@components/h1";
import {cookies} from "next/headers";

export default async function NotFound() {
	const cookiesStore = await cookies()
    const {user} = await validate(cookiesStore.get(lucia.sessionCookieName)?.value)

    if (user) redirect(`/user/${user.name}`)

    return (
        <MaxSize className="center_text">
            <H1>А, кто это?</H1>
            <h3>Игрок не найден</h3>
            <Url href="/users">Посмотреть игроков</Url>
        </MaxSize>
    )
}