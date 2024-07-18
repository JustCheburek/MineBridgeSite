import {PropsWithChildren} from "react";
import Link from "next/link";

export function CheckLink({href, children}: PropsWithChildren<{ href?: string }>) {
	if (!href) return children

	let target = "_self"

	if (href?.toString()?.startsWith("http")) {
		target = "_blank"
	}

	return (
		<Link href={href} target={target}>
			{children}
		</Link>
	)
}