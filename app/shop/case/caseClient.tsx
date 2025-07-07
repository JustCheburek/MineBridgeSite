'use client'

// Next и сервер
import type { MouseEventHandler, PropsWithChildren } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Case, CaseType, Chance, Drop, DropType, Info, RarityNames } from '@/types/case'
import type { User } from 'lucia'
import Link from 'next/link'

// Компоненты
import { MaxSize } from '@components/maxSize'
import { ColorText, Random, SumChances, cn } from '@/lib/utils'
import { Img, ImgBox } from '@components/img'
import { MostikiSvg } from '@ui/SVGS'
import { Button, Url } from '@components/button'
import { List } from '@components/rules'

declare module 'csstype' {
  interface Properties {
    '--_roll-time'?: string
    '--_roll-width'?: string
  }
}

type rollSettings = {
  timeRoll: number
  rollWidth: number
}

type CaseClient = {
  Cases: Case[]
  Drops: Drop[]
  user: User | null
  Add: (Case: Case, Drop: Drop, price: number, item: Info) => Promise<void>
} & PropsWithChildren

export function CaseClient({ Cases, Drops, user, Add, children }: CaseClient) {
  const AMOUNT = 50
  const RESULT = AMOUNT - 2

  const [isRolling, setIsRolling] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [selectedItem, setSelectedItem] = useState(0)

  const rollSettings = useRef<rollSettings>({
    timeRoll: 20000,
    rollWidth: 16100 + Random(80),
  })

  const [rarity, setRarity] = useState<CaseType>(Cases[0].name)
  const [drop, setDrop] = useState<DropType>(Drops[0].name)

  const getInfo = ({
    caseName,
    dropName,
  }: {
    caseName?: CaseType
    dropName?: DropType
  } = {}) => {
    if (!caseName) caseName = rarity
    if (!dropName) dropName = drop

    const caseType = Cases.find(({ name }) => name === caseName)
    const dropType = Drops.find(({ name }) => name === dropName)

    if (!caseType || !dropType) throw new Error('Case или Drop не найден')
    return { caseType, dropType }
  }

  const [items, setItems] = useState<Info[]>([])

  const { caseType, dropType } = getInfo()
  const [price, setPrice] = useState(caseType.price + dropType.price)
  const sumChances = useRef({
    case: SumChances(caseType.rarity),
    drop: SumChances(caseType.drop),
  })

  const setSettingCase = (value: CaseType) => {
    setRarity(value)

    const { caseType, dropType } = getInfo({ caseName: value })
    sumChances.current['case'] = SumChances(caseType.rarity)

    setPrice(caseType.price + dropType.price)
  }

  const setSettingDrop = (value: DropType) => {
    setDrop(value)

    const { caseType, dropType } = getInfo({ dropName: value })
    sumChances.current['drop'] = SumChances(caseType.drop)

    setPrice(caseType.price + dropType.price)
  }

  /** Строит пул имён, повторяя каждое имя chance раз */
  function buildPool<T>(items: Chance<T>[]): T[] {
    const pool: T[] = []
    for (const { name, chance } of items) {
      for (let i = 0; i < chance; i++) {
        pool.push(name)
      }
    }
    return pool
  }

  /** Fisher–Yates shuffle на месте */
  function shuffle<T>(arr: T[]): void {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Random(i + 1)
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }

  function draw<T>(pool: T[]): T {
    return pool.pop()!
  }

  function Update() {
    const { caseType } = getInfo()

    const infos: Info[] = []

    // для каждого «слота» рулетки
    for (let i = 0; i < AMOUNT; i++) {
      // 1) выбираем дроп
      const dropPool = buildPool(drop === 'all' ? caseType.drop : [{ name: drop, chance: 1 }])
      shuffle(dropPool)
      const chosenDropName = draw(dropPool)
      const chosenDrop = Drops.find(({ name }) => name === chosenDropName)!

      // 2) выбираем редкость
      let rarityPool = buildPool(
        chosenDrop.defaultRarity ? [{ name: chosenDrop.defaultRarity, chance: 1 }] : caseType.rarity
      )
      shuffle(rarityPool)
      const chosenRarity = draw(rarityPool)

      // 3) выбираем сам предмет из массива нужной редкости
      const itemsArr =
        chosenDrop[chosenRarity] && chosenDrop[chosenRarity]!.length > 0
          ? chosenDrop[chosenRarity]!
          : chosenDrop.drop!
      const item = itemsArr[Random(itemsArr.length)]

      infos.push({
        DropItem: chosenDrop,
        rarity: chosenRarity,
        Item: item,
        img: item.img ? `/shop/${chosenDrop.name}/${item.name}.webp` : undefined,
      })
    }

    setItems(infos)
    setSelectedItem(0)
  }

  function Win() {
    rollSettings.current.rollWidth = 16050 + Random(200)

    setIsRolling(false)
    setIsWin(false)
    Update()
  }

  function Roll() {
    setTimeout(() => {
      setIsWin(true)
      setSelectedItem(RESULT)
    }, rollSettings.current.timeRoll + 2000)

    const { caseType, dropType } = getInfo()
    Add(caseType, dropType, price, items[RESULT])

    setIsRolling(true)
  }

  useEffect(() => {
    Update()
    // eslint-disable-next-line
  }, [price])

  return (
    <MaxSize
      className={cn(
        'flex flex-col justify-center items-center]',
      )}
    >
      {children}

      <div className="grid xl:grid-cols-[1fr_700px_1fr] gap-2 max-w-[1385px]:my-[70px]">
        <div className="grid grid-rows-[auto_auto] gap-2 h-full text-center max-w-[1385px]:flex-col-reverse">
          <SelectedItem items={items} selectedItem={selectedItem} />

          <div className="flex justify-center flex-col card min-h-[150px] gap-2">
            <Account user={user} price={price} />
          </div>
        </div>

        <div
          className={cn(
            "relative flex justify-start items-center flex-row min-h-full h-[350px] overflow-hidden card px-[45px] text-center mask-gradient",
            { "before:opacity-0": isWin }
          )}
        >
          <span className="absolute left-[350px] z-20 w-[2px] h-full translate-x-[-50%] bg-unic/50 transition-opacity duration-300" />
          <div className={cn(
            "absolute flex flex-row",
            { "animate-[roll_var(--_roll-time)_forwards]": isRolling }
          )} style={{
            '--_roll-time': `${rollSettings.current.timeRoll}ms`,
            '--_roll-width': `-${rollSettings.current.rollWidth}px`,
          }} suppressHydrationWarning>
            {/* Предметы которые можно выбить */}
            {items?.map((info, index) => (
              <ImgBox
                className={cn(
                  "flex justify-center items-center mx-[20px] w-[300px] h-[200px] rounded-base bg-[rgb(18,13,25)] transition-all duration-1000 overflow-hidden box",
                  info?.rarity,
                  {
                    "scale-[1.3] [&_img]:w-full [&_img]:h-full": isWin && index === 48,
                    "animate-disappear": isWin && index !== 48
                  }
                )}
                key={index}
                onMouseEnter={() => selectedItem !== 48 && setSelectedItem(index)}
                hover
              >
                {info.img ? (
                  <Img
                    src={info.img}
                    alt={info?.DropItem?.displayname || 'Картинка'}
                    className="object-cover"
                  />
                ) : (
                  <h4>{info?.DropItem?.displayname}</h4>
                )}
              </ImgBox>
            ))}
          </div>
        </div>

        <div className="grid grid-rows-[auto_auto] gap-2 h-full">
          <form className="flex justify-center flex-col card">
            <h3 className="pb-4 text-unic text-center">Кейс</h3>
            {Cases.map(type => (
              <label key={type.name} className="flex justify-between items-center gap-[15px] cursor-pointer transition-all duration-500 select-none hover:text-unic disabled:text-light-gray disabled:cursor-not-allowed has-checked:text-unic">
                <input
                  type='radio'
                  value={type.name}
                  name='select_case'
                  className="hidden"
                  checked={rarity === type.name}
                  disabled={isRolling}
                  onChange={() => setSettingCase(type.name)}
                  onLoad={() => setSettingCase(rarity)}
                  data-checked={rarity === type.name}
                />
                {type.displayname}
                <p className="inline-flex gap-[5px] items-center text-unic">
                  {type.price} <MostikiSvg />
                </p>
              </label>
            ))}
          </form>

          <form className="flex justify-center flex-col card">
            <h3 className="pb-4 text-unic text-center">Дроп</h3>
            {Drops.filter(Drop => Drop.name !== 'suffix').map(type => (
              <label key={type.name} className="flex justify-between items-center gap-[15px] cursor-pointer transition-all duration-500 select-none hover:text-unic disabled:text-light-gray disabled:cursor-not-allowed has-checked:text-unic">
                <input
                  type='radio'
                  value={type.name}
                  name='select_drop'
                  checked={drop === type.name}
                  className="hidden"
                  disabled={isRolling}
                  onChange={() => setSettingDrop(type.name)}
                  onLoad={() => setSettingDrop(drop)}
                  data-checked={drop === type.name}
                />
                {type.displayname}
                <p className="inline-flex gap-[5px] items-center text-unic">
                  {type.price} <MostikiSvg />
                </p>
              </label>
            ))}
          </form>
        </div>
      </div>

      <RollButton
        user={user}
        price={price}
        isRolling={isRolling}
        isWin={isWin}
        Roll={Roll}
        Win={Win}
      />

      <div className="grid items-center justify-center max-w-sm mx-auto">
        <p className="red-line">
          Косметика автоматически выдаётся и записывается в{' '}
          <Link
            href={user ? `/user/${user?.name}/history` : '/auth'}
            className='text-unic font-medium'
          >
            вашу историю
          </Link>
        </p>
        <div className="ml-6">
          <p>Для использования косметики:</p>
          <List>
            <li>Зайдите на сервер</li>
            <li>
              Введите <code>/uc menu</code>
            </li>
          </List>
        </div>
      </div>
    </MaxSize>
  )
}

function SelectedItem({ items, selectedItem }: { items: Info[]; selectedItem: number }) {
  if (!items[selectedItem]?.Item) {
    return (
      <div className="flex justify-center flex-col card">
        <p className="py-[5px] animate-change">Наведите на картинку рулетки, чтобы увидеть характеристику</p>
      </div>
    )
  }

  return (
    <div className="flex justify-between flex-col card" key={items[selectedItem]?.Item?.name}>
      <h3 className="min-h-16 animate-change text-unic">
        {items[selectedItem]?.Item?.displayname}
      </h3>

      <p className={cn("min-h-16 animate-change text", items[selectedItem]?.rarity)}>
        {items[selectedItem]?.DropItem?.description}
      </p>

      <p className={cn('animate-change text', items[selectedItem]?.rarity)}>
        {RarityNames[items[selectedItem]?.rarity || 'common']}
      </p>
    </div>
  )
}

function Account({ user, price }: { user: User | null; price: number }) {
  if (!user) {
    return (
      <Link href='/auth' className='text-red'>
        Для покупки кейсов нужно создать / войти в аккаунт
      </Link>
    )
  }

  return (
    <>
      <h3>
        <Link href={`/user/${user.name}/history`} className='text-unic'>
          {user.name}
        </Link>
      </h3>
      <p>
        Баланс:{' '}
        <span
          className={cn("inline-flex gap-[5px] items-center", ColorText(user.mostiki, price, "green"))}
        >
          {user.mostiki} <MostikiSvg />
        </span>
      </p>
      <p>
        Стоимость:{' '}
        <span
          className={cn("inline-flex gap-[5px] items-center", ColorText(user.mostiki, price, "green"))}
        >
          {price} <MostikiSvg />
        </span>
      </p>
    </>
  )
}

type RollButton = {
  isRolling: boolean
  isWin: boolean
  price: number
  user: User | null
  Roll: MouseEventHandler<HTMLButtonElement>
  Win: MouseEventHandler<HTMLButtonElement>
}

function RollButton({ isRolling, isWin, price, user, Roll, Win }: RollButton) {
  // Кнопка прокрутки

  if (!user) {
    return <Url href='/auth'>Войти</Url>
  }

  // Проверка прокрутки
  if (isRolling) {
    return (
      <Button disabled={!isWin} onClick={Win}>
        Заново
      </Button>
    )
  }

  // Недостаточно баланса
  if (price > user.mostiki) {
    return (
      <Url
        href={`/shop/buy?mostiki=${price - user.mostiki}`}
        danger
        title={`Не хватает ${price - user.mostiki}м`}
      >
        Баланс
      </Url>
    )
  }

  // Всё успешно
  return <Button onClick={Roll}>Купить</Button>
}
