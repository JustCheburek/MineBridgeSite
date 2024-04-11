"use client";

// React
import Link from "next/link";
import {useEffect, useState} from "react";
import type {User} from "lucia";

// Стили
import "./styles/header.scss";

// Компоненты
import {Urls} from "./urls";
import {MinebridgeSvg, MostikiSvg} from "@ui/svgs";
import {NavLink} from "@components/navlink";
import {Img} from "@components/img";
import {Burger} from "@components/burger";

export function generateMetadata() {
	return {
		alternates: {
			canonical: `${process.env.MB_url}/`,
		},
	};
}

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

function User({user, Logout}: { user: User | null, Logout: Function }) {
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
					<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor"
					     className="unic_color auth_icon" viewBox="0 0 16 16">
						<path
								d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
						<path
								d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
					</svg>
					<div className="for_pc">
						Войти
					</div>
				</NavLink>
		)
	}

	return (
			<nav
					className="user_nav"
					onClick={e => e.stopPropagation()}
			>
				<div className="user_info">
					<p className="for_pc user_mostiki">
						Баланс: {" "}
						<strong className="unic_color user_mostiki" style={{display: "flex"}}>
							{user?.mostiki} <MostikiSvg/>
						</strong>
					</p>

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
							<NavLink href="/users" className="mini_button">
								Игроки
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

export function HeaderClient({user, Logout}: {user: User | null, Logout: Function}) {
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

					<User user={user} Logout={Logout}/>
				</div>
			</header>
	)
}
