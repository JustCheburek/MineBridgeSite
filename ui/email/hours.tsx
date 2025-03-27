export const HoursEmail = async (
    {
        name,
        hours
    }: {
        name: string,
        hours: number
    }
) => (
    <div className="text_color">
        <h1>Привет, <span className="unic_color">{name}</span>!</h1>

        <p>
            Это администрация майнкрафт сервера MineBridge
        </p>
        <br/>
        <p>
            Спасибо большое, что играете на майнбридж, мы дали тебе <strong>{hours} звёзд</strong> за твои наигранные
            часы
        </p>
        <p>
            Вы можете активно продолжать играть на майнбридж и получать плюшки на{" "}
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