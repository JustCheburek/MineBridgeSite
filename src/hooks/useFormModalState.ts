"use client"
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useFormState, useFormStatus} from "react-dom";
import type {User} from "lucia";
import type {setModal} from "@components/modal";

interface initState {
	user: User
	access?: boolean
	setModal: setModal
	message?: string
}

export const useFormModalState = (Func: any, {user, access = false, setModal, message = ""}: initState) => {
	const router = useRouter()
	const formStatus = useFormStatus()
	const [state, formAction] = useFormState(
			Func,
			{
				user, access, message, success: false, error: false
			}
	)

	useEffect(() => {
		if (state.success) {
			setModal(false)
			router.refresh()
		}
	}, [state])

	return [state, formAction, formStatus] as const
}