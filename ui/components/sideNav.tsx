"use client";

// React
import type {ComponentPropsWithoutRef, PropsWithChildren} from "react";
import {useState} from "react";
import Link, {type LinkProps} from "next/link";

// Стиль
import styles from "./styles/sideNav.module.scss";
import subsectionsStyles from "./styles/subsections.module.scss";
import onThisPageStyles from "./styles/onThisPage.module.scss"

// Компоненты
import {NavLink} from "@components/navlink";
import {Burger} from "@components/burger";

export function Subsections({children, menu}: PropsWithChildren<{ menu: string }>) {
    const [burger, setBurger] = useState(false)

    function closeBurger() {
        setBurger(false)
    }

    return (
        <nav className={`${subsectionsStyles.container} ${burger ? subsectionsStyles.burger_active : ""}`}>
            {/* Бургер иконка */}
            <label className={`for_mobile ${subsectionsStyles.burger}`}>
                <Burger burger={burger} setBurger={setBurger} short/>
                <h3>
                    {menu}
                </h3>
            </label>

            <ul className={`not_indent remove_marker ${subsectionsStyles.box} ${styles.box}`} onClick={closeBurger}>
                {children}
            </ul>
        </nav>
    )
}

type SubsectionItem = {
    href: string
    className?: string
	exact?: boolean
}

export const SubsectionItem = ({children, href, className = "", exact = true}: PropsWithChildren<SubsectionItem>) => (
    <li className={`medium-font ${subsectionsStyles.item} ${styles.item}`}>
        <NavLink href={href} exact={exact} className={className}>
            {children}
        </NavLink>
    </li>
)

export const OnThisPage = ({children}: PropsWithChildren) => (
    <nav className="for_pc">
        <ul className={`not_indent remove_marker ${onThisPageStyles.box} ${styles.box}`}>
            {children}
        </ul>
    </nav>
)

export const OnThisPageHeading = ({children}: PropsWithChildren) => (
    <li className={styles.item}>
        <h3 className="unic_color">{children}</h3>
    </li>
)

export const OnThisPageLink = ({children, ...props}: PropsWithChildren<LinkProps>) => (
    <li className={styles.item}>
        <Link className={styles.link} {...props}>{children}</Link>
    </li>
)

export const OnThisPageButton = ({children, ...props}: PropsWithChildren<ComponentPropsWithoutRef<"button">>) => (
    <li className={styles.item}>
        <button className={styles.link} {...props}>{children}</button>
    </li>
)

export const OnThisPageBox = ({children}: PropsWithChildren) => (
    <li>
        <ul className={`remove_marker ${onThisPageStyles.box}`}>
            {children}
        </ul>
    </li>
)