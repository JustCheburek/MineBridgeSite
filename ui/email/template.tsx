import {PropsWithChildren} from "react";

export const Template = (
    {
        name,
        children
    }: PropsWithChildren<{
        name: string
    }>
) => (
    <div className="text_color">
        <h1>Привет, <span className="unic_color">{name}</span>!</h1>

        <p>
            Это администрация майнкрафт сервера MineBridge
        </p>
        <br/>

        {children}

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
        <br/>
        <a href="https://m-br.ru/auth">Отказаться от рассылки</a>
    </div>
)