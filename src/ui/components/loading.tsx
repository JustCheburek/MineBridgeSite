import {Helmet} from "react-helmet";
import {MaxSize} from "@components/maxSize";

export const LoadingHelmet = () => (
    <Helmet>
        <title>Загрузка | Майнбридж</title>
        <meta
            charSet="UTF-8"
            content="Загрузка страницы..."
            name="description"
        />
    </Helmet>
)

export function Loading() {
    return (
        <main>
            <MaxSize className="center_text">
                <LoadingHelmet/>
                <h1>Загрузка</h1>
                <p>Ждите, что сказать...</p>
            </MaxSize>
        </main>
    )
}