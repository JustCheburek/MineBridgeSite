"use client"
import {TypeAnimation} from "react-type-animation";

export function Typing() {
    return (
        <TypeAnimation
            sequence={[
                " — полуванильный майнкрафт сервер", 3500,
                " — самый уникальный сервер", 3500,
                " — сервер без приватов и команд", 3500,
                " — сервер с лором и приколом", 3500,
                " — самый абобовский сервер", 3500
            ]}
            repeat={Infinity}
            cursor={false}
        />
    )
}