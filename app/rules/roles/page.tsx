import { DotRule, Rule, RulesBox } from '@components/rules'
import { UserBox } from '@components/userBox'
import Link from 'next/link'
import { TextUrl } from '@components/textUrl'
import { H1 } from '@components/h1'
import { OnThisPage, OnThisPageLink } from '@components/sideNav'
import { Number } from '@components/number'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Роли',
  description: 'Роли и обязанности на сервере MineBridge',
}

export default function Roles() {
  return (
    <>
      <div className='roles_content'>
        <H1 up>Роли</H1>
        <RulesBox name='general' heading='Общие сведения' number={1}>
          <Rule number={1.1}>Вышестоящая роль управляет нижестоящей</Rule>
          <Rule number={1.2}>
            При отсутствии необходимых знаний нижестоящая роль может обратиться к вышестоящей
          </Rule>
          <Rule number={1.3}>
            Админы и модеры имеют бóльшие права, чем правила, итоговое решение остаётся за ними
          </Rule>
          <Rule number={1.4}>Запрещён абъюз своих прав</Rule>
          <Rule number={1.5}>
            Запрещено раскрывать информацию, не доступную для обычных игроков
          </Rule>
        </RulesBox>
        <RulesBox name='admin' heading='Админ' number={2} marker={true}>
          <DotRule>Разработка сайта</DotRule>
          <DotRule>Управление майнкрафт сервером и хостингом</DotRule>
          <DotRule>Ведение соцсетей и мониторинг серверов</DotRule>
          <DotRule>Исправление багов</DotRule>
          <DotRule>Креативные идеи</DotRule>
          <DotRule>Дизайнерство</DotRule>
          <DotRule>Билдерство</DotRule>
          <DotRule>Планы сервера</DotRule>
          <DotRule>Набор игроков на роли</DotRule>

          <UserBox _id='j8bsrsdgzqa4n0c' />
          <UserBox _id='i5mqq2js4nos1yj' />
          <UserBox _id='8v4pdxujk92dgh5' />
        </RulesBox>

        <RulesBox name='moder' heading='Модер' number={3} marker={true}>
          <DotRule>Настройка и перевод плагинов, датапаков, ресурс паков и т.п.</DotRule>
          <DotRule>Билдерство</DotRule>
          <DotRule>Тестирование</DotRule>
          <DotRule>Решения разных проблем</DotRule>
        </RulesBox>

        <RulesBox name='navigator' heading='Помогатор' number={4} marker={true}>
          <DotRule>Большая категория, состоящая из 5 разделов</DotRule>
          <DotRule>1 человек может участвовать сразу в нескольких разделах</DotRule>
          <TextUrl href='https://discord.gg/swrAFFqvH2'>Стать помогатором</TextUrl>
        </RulesBox>

        <RulesBox name='lor' heading='Лородел' number={4.1} marker={true}>
          <DotRule>
            Владение{' '}
            <Link
              href='https://modrinth.com/plugin/typewriter'
              target='_blank'
              className='text-unic'
            >
              TypeWriter
            </Link>
          </DotRule>
          <DotRule>Креативное мышление</DotRule>
          <UserBox _id='t2dhhl5igw1sp43' />
          <UserBox _id='ruef6d47y245c0x' />
        </RulesBox>

        <RulesBox name='judge' heading='Судья' number={4.2} marker={true}>
          <DotRule>Помощь игрокам для определения общего решения конфликта</DotRule>
          <DotRule>Управление звёздами</DotRule>
          <UserBox _id='t2dhhl5igw1sp43' />
          <UserBox _id='cd8u5lqjg9zjr1b' />
        </RulesBox>

        <RulesBox name='helper' heading='Хелпер' number={4.3} marker={true}>
          <DotRule>Помощь игрокам с их вопросами и вайтлистом</DotRule>
          <DotRule>Осведомление о багах сервера</DotRule>
          <DotRule>Тестирование</DotRule>
          <DotRule>Откат ресурсов игроков в чрезвычайных ситуациях</DotRule>
          <UserBox _id='ruef6d47y245c0x' />
        </RulesBox>

        <RulesBox name='event' heading='Ивент мейкер' number={4.4} marker={true}>
          <DotRule>Создание простых интерактивных ивентов</DotRule>
          <DotRule>
            Пример ивентов: самая красивая база; самый большой и вписанный логотип майнбриджа в базу
          </DotRule>
        </RulesBox>

        <RulesBox name='seo' heading='Постер' number={4.5} marker={true}>
          <DotRule>Пишет посты для телеграм и дискорд каналов</DotRule>
        </RulesBox>

        <RulesBox name='donate' heading='Спонсор' number={4.6} marker={true}>
          <DotRule>Нет прав помогаторов</DotRule>
          <DotRule>Участие в различных голосованиях в чате помогаторов</DotRule>
          <DotRule>Представляет общественное мнение</DotRule>
          <DotRule>Цена: 500₽ в месяц</DotRule>
          <UserBox _id='biu4vqvuev0m0tp' />
        </RulesBox>

        <RulesBox name='mer' heading='Мэр' number={5} marker={true}>
          <DotRule>3 мэра на каждый мир, избираются игроками на один сезон</DotRule>
          <DotRule>
            В течение и в конце сезона за ухоженный и красивый спавн получает звёзды
          </DotRule>
          <DotRule>
            Мэр имеет право запретить строительство на спавне определённым игрокам / снести
            постройку без разрешения владельца
          </DotRule>
          <TextUrl href='https://discord.gg/AkZHn9q5KV'>Стать мэром</TextUrl>
        </RulesBox>

        <RulesBox name='artist' heading='Художник' number={6} marker={true}>
          <DotRule>
            Рисует{' '}
            <Link href='/features/stickers' className='text-unic font-medium'>
              стикеры
            </Link>
          </DotRule>
          <TextUrl href='/shop#stickers'>Заказать</TextUrl>
        </RulesBox>

        <RulesBox name='tester' heading='Тестировщик' number={7} marker={true}>
          <DotRule>Проверяет новые фичи сервера и сайта</DotRule>
          <DotRule>Может получать от 5 звёзд за каждый продуктивный тест</DotRule>
        </RulesBox>

        <RulesBox name='content' heading='Контент мейкер' number={8} marker={true}>
          <DotRule>Стример / ютубер по MineBridge</DotRule>
          <DotRule>Нужно стримить или снимать видео минимум 1 раз в 2 месяца</DotRule>
        </RulesBox>
      </div>

      <OnThisPage>
        <OnThisPageLink href='#terms'>
          <Number>0</Number>
          Термины
        </OnThisPageLink>
        <OnThisPageLink href='#general'>
          <Number>1</Number>
          Сведения
        </OnThisPageLink>
        <OnThisPageLink href='#admin'>
          <Number>2</Number>
          Админ
        </OnThisPageLink>
        <OnThisPageLink href='#moder'>
          <Number>3</Number>
          Модер
        </OnThisPageLink>
        <OnThisPageLink href='#navigator'>
          <Number>4</Number>
          Помогатор
        </OnThisPageLink>
        <OnThisPageLink href='#mer'>
          <Number>5</Number>
          Мэр
        </OnThisPageLink>
        <OnThisPageLink href='#artist'>
          <Number>6</Number>
          Художник
        </OnThisPageLink>
        <OnThisPageLink href='#tester'>
          <Number>7</Number>
          Тестировщик
        </OnThisPageLink>
        <OnThisPageLink href='#content'>
          <Number>8</Number>
          Контент
        </OnThisPageLink>
      </OnThisPage>
    </>
  )
}
