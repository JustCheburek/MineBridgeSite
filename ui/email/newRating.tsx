import {Punishment} from "@/types/punishment";
import {Template} from "@email/template";

export const NewRatingEmail = async (
    {
        name,
        rating,
        punishment
    }: {
        name: string,
        rating: number,
        punishment: Punishment
    }
) => (
    <Template name={name}>
        <p>
            Ваш рейтинг был изменён!{" "}
            {punishment.author} {punishment.rating > 0 ? "добавил" : "забрал"}{" "}
            <strong>{punishment.rating} звёзд</strong> по причине "{punishment.reason}"
        </p>
        <p>
            Теперь у вас <strong>{rating} звёзд</strong>
        </p>
        <p>
            Как поднять звёзды? Можете прочитать в{" "}
            <strong><a href="https://m-br.ru/rules">правилах сервера</a></strong>
        </p>
    </Template>
)