// React / next
// noinspection JSUnusedGlobalSymbols
import type {Metadata} from "next";
import type {HTMLInputTypeAttribute, PropsWithChildren} from "react";
import {Montserrat} from "next/font/google";
import TimeAgo from "javascript-time-ago";
import ru from 'javascript-time-ago/locale/ru'
import {SpeedInsights} from "@vercel/speed-insights/next"

// Стили
import "@styles/normalize.scss"
import "@styles/vars.scss"
import "@styles/text.scss"
import "@styles/urls.scss"
import "@styles/appear.scss"
import "@styles/button.scss"
import "@styles/rarities.scss"
import "@styles/global.scss"

// Компоненты
import {Header} from "@components/header";
import {Footer} from "@components/footer";
import {Metrika} from "./script";

export const experimental_ppr = true

const montserrat = Montserrat({subsets: ["latin"], preload: true, style: "normal"});

export const metadata: Metadata = {
    title: {
        template: "%s • МайнБридж - майнкрафт сервер",
        default: "Майнбридж - майнкрафт сервер",
    },
    description: "Лучший нелицензионный майнкрафт сервер на новых версиях",
    metadataBase: new URL(process.env.NEXT_PUBLIC_RU_URL!),
    creator: "JustCheburek",
    applicationName: "MineBridge",
    category: "game",
    alternates: {
        canonical: './',
    },
    icons: [{
        url: "/logos/256x256/logo.png",
        sizes: "256x256",
        type: "image/png"
    }, {
        url: "/logos/192x192/logo.png",
        sizes: "192x192",
        type: "image/png"
    }, {
        url: "/logos/180x180/logo.png",
        sizes: "180x180",
        type: "image/png",
        rel: "apple-touch-icon"
    }, {
        url: "/logos/150x150/logo.png",
        sizes: "150x150",
        type: "image/png"
    }, {
        url: "/logos/120x120/logo.png",
        sizes: "128x128",
        type: "image/png"
    }, {
        url: "/logos/64x64/logo.png",
        sizes: "64x64",
        type: "image/png"
    }, {
        url: "/logos/32x32/logo.png",
        sizes: "32x32",
        type: "image/png"
    }, {
        url: "/logos/16x16/logo.png",
        sizes: "16x16",
        type: "image/png"
    }, {
        url: "/logos/svg/logo.svg",
        fetchPriority: "high",
        type: "image/svg+xml"
    }],
    authors: [{
        name: "JustCheburek",
        url: "https://t.me/JustCheburek"
    }, {
        name: "Kawa11Fox",
        url: "https://t.me/AleksandraKanivec"
    }, {
        name: "VeBray",
        url: "https://t.me/VeBrau"
    }],
    openGraph: {
        siteName: "MineBridge",
        locale: "ru_RU",
        countryName: "Russia",
        emails: "russkielul@gmail.com",
        url: "./",
        type: "website",
        images: [{
            url: "/logos/256x256/logo.png",
            alt: "Лого майнбриджа",
            width: 256,
            height: 256
        }, {
            url: "/logos/192x192/logo.png",
            alt: "Лого майнбриджа",
            width: 192,
            height: 192,
            type: "image/png"
        }, {
            url: "/logos/180x180/logo.png",
            alt: "Лого майнбриджа",
            width: 180,
            height: 180,
            type: "image/png"
        }, {
            url: "/logos/150x150/logo.png",
            alt: "Лого майнбриджа",
            width: 150,
            height: 150,
            type: "image/png"
        }, {
            url: "/logos/120x120/logo.png",
            alt: "Лого майнбриджа",
            width: 128,
            height: 128,
            type: "image/png"
        }, {
            url: "/logos/64x64/logo.png",
            alt: "Лого майнбриджа",
            width: 64,
            height: 64,
            type: "image/png"
        }, {
            url: "/logos/svg/logo.svg",
            type: "image/svg+xml"
        }]
    },
    twitter: {
        card: "summary",
        images: [{
            url: "/logos/256x256/logo.png",
            alt: "Лого майнбриджа",
            width: 256,
            height: 256
        }, {
            url: "/logos/192x192/logo.png",
            alt: "Лого майнбриджа",
            width: 192,
            height: 192,
            type: "image/png"
        }, {
            url: "/logos/180x180/logo.png",
            alt: "Лого майнбриджа",
            width: 180,
            height: 180,
            type: "image/png"
        }, {
            url: "/logos/150x150/logo.png",
            alt: "Лого майнбриджа",
            width: 150,
            height: 150,
            type: "image/png"
        }, {
            url: "/logos/120x120/logo.png",
            alt: "Лого майнбриджа",
            width: 128,
            height: 128,
            type: "image/png"
        }, {
            url: "/logos/64x64/logo.png",
            alt: "Лого майнбриджа",
            width: 64,
            height: 64,
            type: "image/png"
        }, {
            url: "/logos/svg/logo.svg",
            type: "image/svg+xml"
        }]
    }
}

TimeAgo.addDefaultLocale(ru)

declare module '@tanstack/react-table' {
    // @ts-ignore
    interface ColumnMeta {
        className?: string,
        type?: HTMLInputTypeAttribute
        notEditable?: boolean
    }
}

export default function RootLayout(
    {
        children
    }: PropsWithChildren) {
    return (
        <html lang="ru">
        <body className={montserrat.className}>
        <Header/>
        <main>
            {children}
        </main>
        <Footer/>
        <SpeedInsights/>
        <Metrika/>
        </body>
        </html>
    );
}
