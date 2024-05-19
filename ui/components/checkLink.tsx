import {PropsWithChildren} from "react";
import Link from "next/link";
import type {UrlObject} from "url";

type Url = string | UrlObject;
export function CheckLink({href, children}: PropsWithChildren<{href?: Url}>) {
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