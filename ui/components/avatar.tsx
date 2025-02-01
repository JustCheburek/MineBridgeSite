"use client"

// Сервер
import {useState} from "react";
import type {User} from "lucia";

import styles from "./styles/avatar.module.scss"

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
        <ImgBox className={`${styles.avatar_box} ${className}`}>
            <Img
                src={photo} alt="Ава"
                className={styles.avatar} width={width}
                onError={() => setPhoto("/person.svg")}
            />
        </ImgBox>
    )
}