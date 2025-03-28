import {Template} from "@email/template";

export const MostikiEmail = async (
    {
        name,
        mostiki,
        allMostiki
    }: {
        name: string,
        mostiki: number,
        allMostiki: number
    }
) => (
    <Template name={name}>
        <p>
            Ваши мостики были изменены!{" "}
            {mostiki > 0 ? "Вы получили" : "У вас забрали"}{" "}
            <strong>{mostiki} мостиков</strong>
        </p>
        <p>
            Теперь у вас <strong>{allMostiki} мостиков</strong>
        </p>
    </Template>
)