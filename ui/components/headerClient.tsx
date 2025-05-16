"use client";

// React
import Link from "next/link";
import {Suspense, useEffect, useState} from "react";
import type {User} from "lucia";
import dynamic from "next/dynamic";

// Стили
import "./styles/header.scss";

// Компоненты
import {Urls} from "./urls";
import {AuthSvg, MinebridgeSvg, MostikiSvg, StarSvg} from "@ui/SVGS";
import {NavLink} from "@components/navlink";
import {Burger} from "@components/burger";
import {Skeleton} from "@components/skeleton";
import {Logout} from "@services/user";

const Avatar = dynamic(() => import("@components/avatar"));

type Burger = {
    burger: boolean,
    setBurger: any
}

const MainNav = ({burger, setBurger}: Burger) => (
    <nav
        className={`nav_container ${burger ? "burger_active" : ""}`}
        onClick={() => setBurger(false)}
    >
        <ul className="text_nav nav_box remove_marker not_indent">
            {/* Основная навигация */}
            <li>
                <NavLink href="/" className="mini_button">Главная</NavLink>
            </li>
            <li>
                <NavLink href="/shop" className="mini_button">Магазин</NavLink>
            </li>
            <li>
                <NavLink href="/rules" className="mini_button">Правила</NavLink>
            </li>
            <li>
                <NavLink href="/news" className="mini_button">Новости</NavLink>
            </li>
            <li>
                <NavLink href="/features" className="mini_button">Фичи</NavLink>
            </li>
        </ul>

        <Urls className="url_nav nav_box"/>
    </nav>
)

function User({user}: { user: User | null }) {
    const [isMenu, setIsMenu] = useState(false)

    useEffect(() => {
        document.body.addEventListener('click', () => setIsMenu(false))

        return function cleanUp() {
            document.body.removeEventListener('click', () => setIsMenu(false))
        }
    }, [isMenu]);

    if (!user) {
        return (
            <NavLink href="/auth" className="registration_nav">
                <AuthSvg size="2em" className="auth_icon"/>
                <p className="for_pc semibold-font">
                    Войти
                </p>
            </NavLink>
        )
    }

    return (
        <nav
            className="user_nav"
            onClick={e => e.stopPropagation()}
        >
            <div className="user_info">
                <div className="user_text for_tablet">
                    <NavLink href={`/user/${user.name}`} className="user_name medium-font">
                        {user.name}
                    </NavLink>

                    <small className="user_has semibold-font">
                        <Link href="/rules">
                            <p className="yellow_color user_mostiki">
                                {user?.rating || 0} <StarSvg width="0.8em" height="0.8em"/>
                            </p>
                        </Link>

                        <Link href="/shop/buy">
                            <p className="unic_color user_mostiki">
                                {user?.mostiki || 0} <MostikiSvg width="0.9em" height="0.7em"/>
                            </p>
                        </Link>
                    </small>
                </div>

                <button
                    className="user_info"
                    onClick={() => setIsMenu(prev => !prev)}
                >
                    <Avatar src={user.photo} width={38} className="unic_color"/>
                </button>
            </div>

            <nav className={`user_menu ${isMenu ? "menu_active" : ""}`} id="user_menu">
                <ul className="remove_marker not_indent">
                    <li>
                        <NavLink href={`/user/${user.name}`} className="mini_button">
                            Профиль
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="/milkyway" className="mini_button">
                            Мл. путь
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="/users" className="mini_button">
                            Игроки
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="https://discord.gg/UBB92NjedW" className="mini_button">
                            Кланы
                        </NavLink>
                    </li>
                    <li>
                        <button className="mini_button medium-font red_color logout" onClick={() => Logout()}>
                            Выход
                        </button>
                    </li>
                </ul>
            </nav>
        </nav>
    )
}

export function HeaderClient({user}: { user: User | null }) {
    const [burger, setBurger] = useState<boolean>(false)

    return (
        <header className={burger ? "burger_active" : ""}>
            <div className="header">
                {/* Бургер иконка */}
                <Burger burger={burger} setBurger={setBurger}/>

                {/* Лого */}
                <Link href="/" className="logo" rel="shortcut icon" aria-label="Переход на главную страницу">
                    <MinebridgeSvg/>
                </Link>

                {/* Навигация */}
                <MainNav burger={burger} setBurger={setBurger}/>

                <Suspense fallback={<Skeleton width={180} height={40}/>}>
                    <User user={user}/>
                </Suspense>
            </div>
        </header>
    )
}
