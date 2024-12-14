export const EmailTemplate = async (
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
        <p>
            <strong>Открытие нашего сервера</strong> уже в <strong>СЕГОДНЯ, 14 декабря, в 9:00 по мск</strong>
        </p>
        <p>
            Посмотрите бомбезный <strong><a href="https://youtu.be/m7ipkVv_FPE">трейлер</a></strong>, если до сих пор его не видели
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