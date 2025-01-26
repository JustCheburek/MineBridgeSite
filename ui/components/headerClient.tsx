"use client";

// React
import Link from "next/link";
import {Suspense, useEffect, useState} from "react";
import type {User} from "lucia";

// Стили
import "./styles/header.scss";

// Компоненты
import {Urls} from "./urls";
import {AuthSvg, MinebridgeSvg, MostikiSvg, StarSvg} from "@ui/SVGS";
import {NavLink} from "@components/navlink";
import {Img} from "@components/img";
import {Burger} from "@components/burger";
import {Skeleton} from "@components/skeleton";
import {Logout} from "@services/user";

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
                <Link href="/rules" className="for_tablet">
                    <strong className="yellow_color user_mostiki">
                        {user?.rating || 0} <StarSvg/>
                    </strong>
                </Link>

                <Link href="/shop/buy" className="for_tablet">
                    <strong className="unic_color user_mostiki">
                        {user?.mostiki || 0} <MostikiSvg/>
                    </strong>
                </Link>

                <button
                    className="unic_color user_icon_box"
                    onClick={() => setIsMenu(prev => !prev)}
                >
                    <Img
                        src={user.photo} alt="Ава"
                        className="user_icon"
                        width={38}
                    />
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
