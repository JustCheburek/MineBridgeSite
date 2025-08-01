// React / next
// noinspection JSUnusedGlobalSymbols
import type { Metadata } from 'next'
import type { HTMLInputTypeAttribute, PropsWithChildren } from 'react'
import { Montserrat } from 'next/font/google'
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru'
import { EdgeStoreProvider } from '@/lib/edgestore'
import { z } from 'zod/v4'
import { cn } from '@/lib/utils'

// Стили
import './globals.css'

// Компоненты
import { Header } from '@components/header'
import { Footer } from '@components/footer'
import { Metrika } from './script'
import { Providers } from './providers'

//export const experimental_ppr = true

const montserrat = Montserrat({ subsets: ['latin'], preload: true, style: 'normal' })

export const metadata: Metadata = {
  title: {
    template: '%s • Майнбридж - майнкрафт сервер',
    default: 'Майнбридж - майнкрафт сервер',
  },
  description: 'Лучший нелицензионный майнкрафт сервер на новых версиях',
  metadataBase: new URL(process.env.NEXT_PUBLIC_RU_URL!),
  creator: 'JustCheburek',
  applicationName: 'MineBridge',
  category: 'game',
  keywords: [
    'майбридж',
    'майбриц',
    'майбрид',
    'майбриж',
    'манбридж',
    'манбриц',
    'манбрид',
    'манбриж',
    'маинбридж',
    'маинбриц',
    'маинбрид',
    'маинбриж',
    'мейнбридж',
    'мейнбриц',
    'мейнбрид',
    'мейнбриж',
    'майннбридж',
    'майннбриц',
    'майннбрид',
    'маймбридж',
    'маймбриц',
    'маймбрид',
    'майынбридж',
    'майынбриц',
    'майнбриг',
    'майнбрич',
    'майнбригг',
    'майнбрыдж',
    'майнбрыж',
    'майнбриджж',
    'майнбрижж',
    'майнбритч',
    'майнбритц',
    'майнбредж',
    'майнбрэдж',
    'майнбриджь',
    'майнбрідж',
    'майнбрридж',
    'мейнбричч',
    'мейнбритц',
    'майнбрджи',
    'майнбрдж',
    'майнбриджы',
    'майнбриджи',
    'майнбрюдж',
    'майнбрэд',
    'майнбрэж',
    'майнбриджъ',
    'майнбриджей',
    'майнбриджа',
    'mainbridg',
    'mainbrij',
    'mainbridj',
    'maynbridzh',
    'mainbrydge',
    'minebridge',
    'minebrij',
    'minebridg',
  ],
  icons: [
    {
      url: '/logos/256x256/logo.png',
      sizes: '256x256',
      type: 'image/png',
    },
    {
      url: '/logos/192x192/logo.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      url: '/logos/180x180/logo.png',
      sizes: '180x180',
      type: 'image/png',
      rel: 'apple-touch-icon',
    },
    {
      url: '/logos/150x150/logo.png',
      sizes: '150x150',
      type: 'image/png',
    },
    {
      url: '/logos/120x120/logo.png',
      sizes: '128x128',
      type: 'image/png',
    },
    {
      url: '/logos/64x64/logo.png',
      sizes: '64x64',
      type: 'image/png',
    },
    {
      url: '/logos/32x32/logo.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      url: '/logos/16x16/logo.png',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      url: '/logos/svg/logo.svg',
      type: 'image/svg+xml',
    },
  ],
  authors: [
    {
      name: 'JustCheburek',
      url: 'https://t.me/JustCheburek',
    },
    {
      name: 'Kawa11Fox',
      url: 'https://t.me/Kawa11Fox',
    },
    {
      name: 'VeBray',
      url: 'https://t.me/VeBrau',
    },
  ],
  alternates: {
    canonical: './',
  },
  openGraph: {
    siteName: 'MineBridge',
    locale: 'ru_RU',
    countryName: 'Russia',
    emails: 'russkielul@gmail.com',
    url: './',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

TimeAgo.addDefaultLocale(ru)
z.config(z.locales.ru())

declare module '@tanstack/react-table' {
  // @ts-ignore
  interface ColumnMeta {
    className?: string
    type?: HTMLInputTypeAttribute
    notEditable?: boolean
    defaultSort?: 'asc' | 'desc'
  }
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='ru' className='h-full scroll-smooth'>
      <body
        className={cn(
          montserrat.className,
          'text-p leading-p bg-background text-text accent-unic caret-unic relative flex h-full min-h-full flex-col'
        )}
      >
        <Providers>
          <EdgeStoreProvider>
            <Header />
            <main className='flex-1 flex-shrink-0'>{children}</main>
            <Footer />
          </EdgeStoreProvider>
        </Providers>
        <Metrika />
      </body>
    </html>
  )
}
