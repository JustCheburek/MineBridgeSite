import {Img} from "@components/img"
import type {User} from "lucia";

export const Avatar = ({user}: { user: User }) => (
		<Img src={user.photo} alt="Ава" className="user_icon" width={180}/>
)