"use client"

// Сервер
import {useState} from "react";
import type {User} from "lucia";

// Компоненты
import {Img, ImgBox} from "@components/img"

export const Avatar = ({photo: userPhoto}: { photo: User["photo"] }) => {
    const [photo, setPhoto] = useState<string>(userPhoto)

    return (
        <ImgBox>
            <Img
                src={photo} alt="Ава"
                className="user_icon" width={180}
                onError={() => setPhoto("/person.svg")}
            />
        </ImgBox>
    )
}