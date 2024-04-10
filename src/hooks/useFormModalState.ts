"use client"
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useFormState} from "react-dom"
import type {User} from "lucia";
import type {setModal} from "@components/modal";
import type {State} from "@services/user";

interface initState {
	user: User
	access?: boolean
	setModal: setModal
	message?: string
}

export const useFormModalState = (Func: (state: State, formData: FormData) => State | Promise<State>, {user, access = false, setModal, message = ""}: initState) => {
	const router = useRouter()
	const [state, formAction, isPending] = useFormState<State>(
			// @ts-ignore
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

	return [state, formAction, isPending] as const
}