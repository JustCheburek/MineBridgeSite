"use client"
import type {ElementRef} from "react";
import {useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import styles from "../modal.module.scss"

export function Modal() {
	const router = useRouter()
	const dialogRef = useRef<ElementRef<"dialog">>(null)

	useEffect(() => {
		dialogRef.current?.showModal()
	}, [])

	return (
			<dialog
					ref={dialogRef}
					onClick={({target}) =>
							target === dialogRef.current && router.back()
					}
					onClose={router.back}
					className={styles.modal}
			>
				<button
						className={`${styles.close_modal} bold-font`}
						onClick={({target}) =>
								target === dialogRef.current && router.back()
						}
				>
					x
				</button>
			</dialog>
	)
}