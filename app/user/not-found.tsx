import {MaxSize} from "@components/maxSize";
import {Url} from "@components/button";
import {validate} from "@services/validate";
import {redirect} from "next/navigation";
import {H1} from "@components/h1";

export default async function NotFound() {
    const {user} = await validate()

    if (user) redirect(`/user/${user.name}`)

    return (
        <MaxSize className="center_text">
            <H1>А, кто это?</H1>
            <h3>Игрок не найден</h3>
            <Url href="/users">Посмотреть игроков</Url>
        </MaxSize>
    )
}