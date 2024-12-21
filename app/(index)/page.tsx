import type {Metadata} from "next";
import dynamic from "next/dynamic";

import styles from "./styles/page.module.scss";

const InfoSection = dynamic(() => import("./info_section"));
const UnicSection = dynamic(() => import("./unic_section"));
const AdvantageSection = dynamic(() => import("./advantage_section"));
const RegistrationSection = dynamic(() => import("./registration_section"));
const YtSection = dynamic(() => import("./yt_section"));

export const metadata: Metadata = {
    title: "Главная",
    description: "Хороший пинг, частые ивенты, уникальные данжы, кланы! Сервер с лета 2022!"
};

export default function Index() {
    return (
        <>
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
        </>
    );
}
