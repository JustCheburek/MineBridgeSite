import {useNavigate, useRouteError} from "react-router-dom";
import {Button} from "./button";
import {MaxSize} from "@components/maxSize";

export const ErrorHelmet = () => (
    <Helmet>
        <title>Ошибка | Майнбридж</title>
        <meta
            charSet="UTF-8"
            content="Кажется что-то пошло не так!"
            name="description"
        />
    </Helmet>
)

export function Error() {
    const error = useRouteError()
    const navigate = useNavigate();
    console.error(error)

    return (
        <main className="error">
            <MaxSize className="center_text">
                <ErrorHelmet/>

                <h1 className="unic_color">Ошибка {error?.response?.status}</h1>
                <p>{error?.message}</p>

                <Button
                    onClick={() => navigate(-1)}
                >
                    Вернуться
                </Button>
            </MaxSize>
        </main>
    )
}