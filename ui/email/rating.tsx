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
    <div className="text_color">
        <h1>Привет, <span className="unic_color">{name}</span>!</h1>
        <p>
            Это администрация майнкрафт сервера MineBridge
        </p>
        <br/>
        <p>
            Ваш рейтинг был пересмотрен! Теперь у вас <strong>{rating} звёзд</strong>{" "}
            (было <strong>{oldRating} звёзд</strong>)
        </p>
        <p>
            Как поднять звёзды? Можете прочитать в{" "}
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