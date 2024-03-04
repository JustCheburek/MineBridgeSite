import type {Metadata} from "next";

import styles from "./styles/page.module.scss";

import {InfoSection} from "./info_section";
import {UnicSection} from "./unic_section";
import {AdvantageSection} from "./advantage_section";
import {RegistrationSection} from "./registration_section";
import {YtSection} from "./yt_section";

export const metadata: Metadata = {
	title: "Главная | Майнбридж",
	description: "Майнбридж — лучший нелицензионный майнкрафт сервер на новых версиях! Хороший пинг, частые ивенты, уникальные данжы, кланы! Сервер с лета 2022!",
};

export default function Index() {
	return (
			<main>
				{/*
          Секция первая
          Серверная информация для входа
          Регистрация
        */}
				<InfoSection/>

				{/*
          Градиент из серого в чёрный
        */}
				<div className={styles.gradient_gray_black}/>

				{/*
          Секция вторая
          уникальность сервера
        */}
				<UnicSection/>

				{/*
          Секция третья
          преимущества сервера
        */}
				<AdvantageSection/>

				{/* Градиент из чёрного в серый*/}
				<div className={styles.gradient_black_gray}/>

				{/*
          Секция пятая
          повторяется серверная информация для входа
          Регистрация / вход
        */}
				<RegistrationSection/>

				{/*
          Секция шестая
          видео
        */}
				<YtSection/>
			</main>
	);
}
