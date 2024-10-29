import {MaxSize} from "@components/maxSize";
import {H1} from "@components/h1";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Запись в аду",
    description: "Лоооор! 6 сезон!",
    openGraph: {
        title: "Запись в аду",
        description: "Лоооор! 6 сезон!",
        videos: ["https://youtu.be/XavIL238_FA"]
    },
    twitter: {
        title: "Запись в аду",
        description: "Лоооор! 6 сезон!",
    }
};

export default function Scientist() {
    return (
        <MaxSize>
            <H1>Запись в аду</H1>

            <iframe
                src="https://www.youtube.com/embed/XavIL238_FA?si=MfqXr_2tr3vKi3gK"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
            />
        </MaxSize>
    )
}