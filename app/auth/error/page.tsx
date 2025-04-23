import {MaxSize} from "@components/maxSize";
import {H1} from "@components/h1";

type Code = {
    error: "code"
    state: string
    code: string
    storedState: string
    code_verifier: string
}

type Email = {
    error: "email"
    name: string
    email: string
    ver?: boolean
}

type Error = {
    searchParams: Promise<Code | Email | undefined>
}

export default async function Error(
    {
        searchParams
    }: Error) {
    const params = await searchParams

    return (
        <MaxSize>
            <H1>
                Ошибка {params?.error}
            </H1>

            {params?.error === "code" &&
              <div className="all_select grid_center">
                <p>
                  Код: <code>{params?.code}</code>
                </p>
                <p>
                  Код верификации: <code>{params?.code_verifier}</code>
                </p>
                <br/>
                <p>
                  Состояние: <code>{params?.state}</code>
                </p>
                <p>
                  Состояние в cookies: <code>{params?.storedState}</code>
                </p>
                <p>
                  Состояния:{" "}
                  <strong>{params?.storedState === params?.state ? "равны" : "не равны"}</strong>
                </p>
              </div>
            }

            {params?.error === "email" &&
              <div className="all_select grid_center">
                <p>
                  Имя: <code>{params?.name ?? "нету"}</code>
                </p>
                <p>
                  Почта: <code>{params?.email ?? "нету"}</code>
                </p>
                <p>
                  Верификация почты: <code>{params?.ver ?? "нету"}</code>
                </p>
              </div>
            }
        </MaxSize>
    )
}