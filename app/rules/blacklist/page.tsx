// React
import type {Metadata} from "next";

// Компоненты
import {BlacklistContent} from "./components";

export const metadata: Metadata = {
    title: "Выражения",
    description: "Список запреток на Twitch, которые строго запрещены и у нас на сервере!",
    openGraph: {
        title: "Выражения",
        description: "Список запреток на Twitch, которые строго запрещены и у нас на сервере!",
    },
    twitter: {
        title: "Выражения",
        description: "Список запреток на Twitch, которые строго запрещены и у нас на сервере!",
    }
};

export default function Blacklist() {
    return (
        <BlacklistContent/>
    )
}

