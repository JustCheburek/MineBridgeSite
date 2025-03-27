import {Punishment} from "@/types/punishment";

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
    <div className="text_color">
        <h1>Привет, <span className="unic_color">{name}</span>!</h1>
        <p>
            Это администрация майнкрафт сервера MineBridge
        </p>
        <br/>
        <p>
            Ваш рейтинг был изменён!{" "}
            {punishment.author} {rating > 0 ? "добавил" : "забрал"}{" "}
            <strong>{punishment.rating} звёзд</strong> по причине "{punishment.reason}"
        </p>
        <p>
            Теперь у вас <strong>{rating} звёзд</strong>
        </p>
        <p>
            Как поднять звёзд вы можете прочитать в{" "}
            <strong><a href="https://m-br.ru/rules">правилах сервера</a></strong>
        </p>
        <br/>
        <p>
            Вы получили это письмо, потому что вы ценный участник{" "}
            <strong><a href="https://m-br.ru">сообщества MineBridge</a></strong>
        </p>
        <p>
            Вы можете следить за актуальными новостями в{" "}
            <strong><a href="https://t.me/MineBridgeOfficial">телеграме</a></strong>{" "}
            или <strong><a href="https://discord.gg/rmWAuKGb69">дискорде</a></strong>
        </p>
    </div>
)