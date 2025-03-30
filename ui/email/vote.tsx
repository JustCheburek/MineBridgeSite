import {Template} from "@email/template";
import {User} from "lucia";

export const VoteEmail = async (
    {
        name
    }: {
        name: User["name"]
    }
) => (
    <Template name={name}>
        <p>
            Спасибо большое за голос за майнбридж, мы дали тебе <strong>одну звезду</strong>
        </p>
        <p>
            <strong>Через 24 часа</strong> ты можешь проголосовать снова и получить ещё звёзд
        </p>
        <p>
            Можешь активно голосовать за майнбридж и получать плюшки на{" "}
            <strong><a href="https://m-br.ru/milkyway">млечном пути</a></strong>
        </p>
    </Template>
)