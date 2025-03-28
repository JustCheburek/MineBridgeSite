import {Template} from "@email/template";

export const HoursEmail = async (
    {
        name,
        hours
    }: {
        name: string,
        hours: number
    }
) => (
    <Template name={name}>
        <p>
            Спасибо большое, что играете на майнбридж, мы дали тебе <strong>{hours} звёзд</strong> за твои наигранные
            часы
        </p>
        <p>
            Вы можете активно продолжать играть на майнбридж и получать плюшки на{" "}
            <strong><a href="https://m-br.ru/milkyway">млечном пути</a></strong>
        </p>
    </Template>
)