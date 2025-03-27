export const VoteEmail = async (
    {
        name
    }: {
        name: string
    }
) => (
    <div className="text_color">
        <h1>Привет, <span className="unic_color">{name}</span>!</h1>

        <p>
            Это администрация майнкрафт сервера MineBridge
        </p>
        <br/>
        <p>
            Спасибо большое за голос за майнбридж, мы дали тебе <strong>одну звезду</strong>
        </p>
        <p>
            <strong>Через 24 часа</strong> ты можешь проголосовать снова и получить ещё звёзд
        </p>
        <p>
            Вы можете активно голосовать за майнбридж и получать плюшки на{" "}
            <strong><a href="https://m-br.ru/milkyway">млечном пути</a></strong>
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