"use client"

// Сервер
import type {User} from "lucia";

export function Name({user}: { user: User}) {
	return (
		<h2 className="unic_color">
			<span className="all_select">{user.name}</span>
		</h2>
	)
}