import styles from "./styles/burger.module.scss"
import type {ComponentPropsWithoutRef, Dispatch, SetStateAction} from "react";

type Burger = {
    burger: boolean
    setBurger?: Dispatch<SetStateAction<boolean>>
    short?: boolean
}

export function Burger(
    {
        burger,
        setBurger,
        short = false,
        className,
        ...props
    }: Burger & ComponentPropsWithoutRef<"span">) {
    return (
        <button
            className={`for_mobile ${styles.icon} ${burger ? styles.active : ""} ${className}`}
            onClick={() => setBurger && setBurger((prev: boolean) => !prev)}
            name="burger_icon"
            {...props}
        >
            <div className={styles.stick}/>
            <div className={styles.stick}/>
            <div className={`${styles.stick} ${short ? styles.short : ""}`}/>
        </button>
    )
}