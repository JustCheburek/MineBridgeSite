// Сервер
import type { Metadata } from "next";
import { validate } from "@services/user/validate";
import { getCodes } from "@services/code";

// Компоненты
import { H1 } from "@components/h1";
import { PBox, PText, PTitle } from "@components/post";
import { FormLink } from "@components/form";
import { Code } from "@/types/code";
import { UserBox } from "@components/userBox";
import { MostikiSvg } from "@ui/SVGS";
import { revalidateTag } from "next/cache";
import { Create, Use } from "./components";

export const metadata: Metadata = {
    title: "Коды",
    description: "Коды — новый способ передачи мостиков. Этот код можно передать кому угодно в любое время"
}

function CodeBox({ code, authorId }: { code: Code, authorId?: Code["authorId"] }) {
    return (
        <div>
            <UserBox _id={code.authorId}>
                <p>
                    {code.mostiki} <MostikiSvg />
                </p>
            </UserBox>

            {authorId === code.authorId &&
                <h4 className="center_text all_select unic_color medium-font">
                    {code._id}
                </h4>
            }
        </div>
    )
}

export default async function Component() {
    const { user } = await validate()
    const codes = await getCodes()

    return (
        <div>
            <H1
                up
                reload={async () => {
                    "use server";
                    revalidateTag("all")
                }}
            >
                Коды
            </H1>

            <PBox id="transfer">
                <PTitle>
                    <h2>
                        Что это?
                    </h2>
                </PTitle>
                <PText>
                    <p>
                        Коды — это новый способ передачи мостиков
                    </p>
                    <br />
                    <p>
                        При генерации кода на него нужно положить определённое количество мостиков. Этот код можно
                        передать кому угодно в любое время
                    </p>
                </PText>
            </PBox>

            <PBox>
                <PTitle>
                    <h2>
                        Создать
                    </h2>
                </PTitle>

                <PText>
                    {user
                        ? <Create _id={user._id} mostiki={user.mostiki} />
                        : <FormLink href="/auth">
                            Войти
                        </FormLink>
                    }
                </PText>
            </PBox>

            <PBox>
                <PTitle>
                    <h2>
                        Применить
                    </h2>
                </PTitle>

                <PText>
                    {user
                        ? <Use _id={user._id} />
                        : <FormLink href="/auth">
                            Войти
                        </FormLink>
                    }
                </PText>
            </PBox>

            <PBox>
                <PTitle>
                    <h2>
                        Текущие коды
                    </h2>
                </PTitle>
                <PText>
                    {codes.length > 0
                        ? codes.map((code: Code) =>
                            <CodeBox key={code._id} code={code} authorId={user?._id} />
                        )
                        :
                        <p>
                            Кодов пока нет
                        </p>
                    }
                </PText>
            </PBox>
        </div>
    )
}
