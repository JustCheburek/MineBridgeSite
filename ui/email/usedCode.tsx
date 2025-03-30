import {Template} from "@email/template";
import {User} from "lucia";
import {Code} from "@/types/code";

export const UsedCodeEmail = async (
    {
        name,
        mostiki,
        code,
        userName
    }: {
        name: User["name"],
        mostiki: User["mostiki"],
        code: Code["_id"],
        userName: User["name"]
    }
) => (
    <Template name={name}>
        <p>
            {userName} успешно использовал промокод! Он получил{" "}
            <strong>{mostiki} мостиков</strong>.
        </p>
        <h3>
            {code}
        </h3>
    </Template>
)