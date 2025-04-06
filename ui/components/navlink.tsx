"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";
import {PropsWithChildren} from "react";

type NavLink = {
    href: string
    activeClassName?: string
    className?: string
    exact?: boolean
}

export function NavLink(
    {
        href, children, activeClassName = "active", className = "", exact = false, ...props
    }: PropsWithChildren<NavLink>
) {
    const pathname = usePathname()
    if (href === "/") {
        exact = true
    }
    const isActive = exact ? pathname === href : pathname.startsWith(href)

    return (
        <Link href={href} className={`${isActive ? activeClassName : ""} ${className}`} {...props}>
            {children}
        </Link>
    )
}