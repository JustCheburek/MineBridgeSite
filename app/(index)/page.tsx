import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const InfoSection = dynamic(() => import('./info_section'))
const UnicSection = dynamic(() => import('./unic_section'))
const AdvantageSection = dynamic(() => import('./advantage_section'))
const RegistrationSection = dynamic(() => import('./registration_section'))
const YtSection = dynamic(() => import('./yt_section'))

export const metadata: Metadata = {
  title: 'Главная',
  description: 'Хороший пинг, частые ивенты, уникальные данжи, кланы! Сервер с лета 2022!',
}

export default function Index() {
  return (
    <>
      {/*
            Секция первая
            Серверная информация для входа
            Регистрация
            */}
      <InfoSection />

      {/*
            Градиент из серого в чёрный
            */}
      <div className='from-background h-60 bg-gradient-to-b to-black' />

      {/*
            Секция вторая
            уникальность сервера
            */}
      <UnicSection />

      {/*
            Секция третья
            преимущества сервера
            */}
      <AdvantageSection />

      {/* Градиент из чёрного в серый*/}
      <div className='to-background h-60 bg-gradient-to-b from-black' />

      {/*
            Секция пятая
            повторяется серверная информация для входа
            Регистрация / вход
            */}
      <RegistrationSection />

      {/*
            Секция шестая
            видео
            */}
      <YtSection />
    </>
  )
}
