import {Template} from "@email/template";

export const RatingEmail = async (
    {
        name,
        rating,
        oldRating
    }: {
        name: string,
        rating: number,
        oldRating: number
    }
) => (
    <Template name={name}>
        <p>
            Ваш рейтинг был пересмотрен! Теперь у вас <strong>{rating} звёзд</strong>{" "}
            (было <strong>{oldRating} звёзд</strong>)
        </p>
        <p>
            Как поднять звёзды? Можете прочитать в{" "}
            <strong><a href="https://m-br.ru/rules">правилах сервера</a></strong>
        </p>
    </Template>
)