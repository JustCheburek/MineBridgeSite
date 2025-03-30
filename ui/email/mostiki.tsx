import {Template} from "@email/template";
import {User} from "lucia";

export const MostikiEmail = async (
    {
        name,
        mostiki,
        allMostiki
    }: {
        name: User["name"],
        mostiki: User["mostiki"],
        allMostiki: User["mostiki"]
    }
) => (
    <Template name={name}>
        <p>
            Твои мостики были изменены!{" "}
            {mostiki > 0 ? "Ты получил" : "У тебя забрали"}{" "}
            <strong>{Math.abs(mostiki)} мостиков</strong>
        </p>
        <p>
            Теперь у тебя <strong>{allMostiki} мостиков</strong>
        </p>
    </Template>
)