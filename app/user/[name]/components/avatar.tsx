"use client"

// Сервер
import type {User} from "lucia";

// Компоненты
import {Img, ImgBox} from "@components/img"

export const Avatar = ({user}: { user: User }) => {
	return (
		<ImgBox>
			<Img src={user.photo} alt="Ава" className="user_icon" width={180}/>
		</ImgBox>
	)
}