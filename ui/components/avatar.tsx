"use client"

// Сервер
import {useState} from "react";
import type {User} from "lucia";

// Компоненты
import {Img, ImgBox} from "@components/img"

type Avatar = {
    src: User["photo"]
    className?: string
    width?: number | `${number}`
}

export default function Avatar({src, className="", width = 180}: Avatar) {
    const [photo, setPhoto] = useState<string>(src)

    return (
        <ImgBox className={className}>
            <Img
                src={photo} alt="Ава"
                className="user_icon" width={width}
                onError={() => setPhoto("/person.svg")}
            />
        </ImgBox>
    )
}