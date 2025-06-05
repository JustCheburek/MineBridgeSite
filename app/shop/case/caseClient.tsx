"use client"

// Next и сервер
import type {MouseEventHandler, PropsWithChildren} from "react";
import {useEffect, useRef, useState} from "react";
import {Case, CaseType, Chance, Drop, DropType, Info, RarityNames} from "@/types/case";
import type {User} from "lucia";
import Link from "next/link";

// Стили
import styles from "./case.module.scss"

// Компоненты
import {MaxSize} from "@components/maxSize";
import {Random, SumChances} from "@app/utils";
import {Img, ImgBox} from "@components/img";
import {MostikiSvg} from "@ui/SVGS";
import {Button, Url} from "@components/button";
import {H1} from "@components/h1";

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

export function CaseClient({Cases, Drops, user, Add, children}: CaseClient) {
    const AMOUNT = 50
    const RESULT = AMOUNT - 2

    const [isRolling, setIsRolling] = useState(false)
    const [isWin, setIsWin] = useState(false)
    const [selectedItem, setSelectedItem] = useState(0)

    const rollSettings = useRef<rollSettings>({
        timeRoll: 20000,
        rollWidth: 16100 + Random(80)
    })

    const [rarity, setRarity] = useState<CaseType>(Cases[0].name)
    const [drop, setDrop] = useState<DropType>(Drops[0].name)

    const getInfo = (
        {
            caseName,
            dropName
        }: {
            caseName?: CaseType,
            dropName?: DropType
        } = {}
    ) => {
        if (!caseName) caseName = rarity
        if (!dropName) dropName = drop

        const caseType = Cases.find(({name}) => name === caseName)
        const dropType = Drops.find(({name}) => name === dropName)

        if (!caseType || !dropType) throw new Error("Case или Drop не найден")
        return {caseType, dropType}
    }

    const [items, setItems] = useState<Info[]>([])

    const {caseType, dropType} = getInfo()
    const [price, setPrice] = useState(
        caseType.price + dropType.price
    )
    const sumChances = useRef({
        case: SumChances(caseType.rarity),
        drop: SumChances(caseType.drop)
    })

    const setSettingCase = (value: CaseType) => {
        setRarity(value)

        const {caseType, dropType} = getInfo({caseName: value})
        sumChances.current["case"] = SumChances(caseType.rarity)

        setPrice(caseType.price + dropType.price)
    }

    const setSettingDrop = (value: DropType) => {
        setDrop(value)

        const {caseType, dropType} = getInfo({dropName: value})
        sumChances.current["drop"] = SumChances(caseType.drop)

        setPrice(caseType.price + dropType.price)
    }

    /** Строит пул имён, повторяя каждое имя chance раз */
    function buildPool<T>(items: Chance<T>[]): T[] {
        const pool: T[] = []
        for (const {name, chance} of items) {
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
        const {caseType} = getInfo()

        const infos: Info[] = []

        // для каждого «слота» рулетки
        for (let i = 0; i < AMOUNT; i++) {
            // 1) выбираем дроп
            const dropPool = buildPool(
                drop === "all"
                    ? caseType.drop
                    : [{name: drop, chance: 1}]
            )
            shuffle(dropPool)
            const chosenDropName = draw(dropPool)
            const chosenDrop = Drops.find(({name}) => name ===  chosenDropName)!

            // 2) выбираем редкость
            let rarityPool = buildPool(
                chosenDrop.defaultRarity
                    ? [{name: chosenDrop.defaultRarity, chance: 1}]
                    : caseType.rarity
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
                img: item.img
                    ? `/shop/${chosenDrop.name}/${item.name}.webp`
                    : undefined
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
        }, rollSettings.current.timeRoll)

        const {caseType, dropType} = getInfo()
        Add(caseType, dropType, price, items[RESULT])

        setIsRolling(true)
    }

    useEffect(() => {
        Update()
        // eslint-disable-next-line
    }, [price]);

    return (
        <MaxSize
            width={1440}
            className={styles.max_size}
            style={{
                '--_roll-time': `${rollSettings.current.timeRoll}ms`,
                '--_roll-width': `-${rollSettings.current.rollWidth}px`
            }}
            suppressHydrationWarning
        >
            {children}

            <div className={styles.main_container}>
                <div className={`${styles.left_container} ${styles.container} center_text`}>
                    <SelectedItem items={items} selectedItem={selectedItem}/>

                    <div className={`${styles.account} ${styles.box}`}>
                        <Account user={user} price={price}/>
                    </div>
                </div>

                <div className={`${styles.visual_container} ${styles.box} center_text ${isWin ? styles.win : ""}`}>
                    <div className={`${styles.natural_container} ${isRolling ? styles.roll : ""}`}>
                        {/* Предметы которые можно выбить */}
                        {items?.map((info, index) => (
                            <ImgBox
                                className={`${styles.item} ${info?.rarity}_box ${index === 48 ? styles.result : ""}`}
                                key={index}
                                onMouseEnter={() => selectedItem !== 48 && setSelectedItem(index)}
                                hover
                            >
                                {info.img
                                    ? <Img src={info.img} alt={info?.DropItem?.displayname || "Картинка"}
                                           className={styles.img}/>
                                    : <h4>
                                        {info?.DropItem?.displayname}
                                    </h4>
                                }
                            </ImgBox>
                        ))}
                    </div>
                </div>

                <div className={`${styles.right_container} ${styles.container}`}>
                    <form className={styles.box}>
                        <h3 className={`${styles.heading} unic_color center_text`}>
                            Кейс
                        </h3>
                        {Cases.map((type) => (
                            <label key={type.name} className={`${styles.select_item} no_select`}>
                                <input
                                    type="radio" value={type.name} name="select_case"
                                    className={styles.select_input}
                                    checked={rarity === type.name}
                                    disabled={isRolling}
                                    onChange={() => setSettingCase(type.name)}
                                    onLoad={() => setSettingCase(rarity)}
                                />
                                {type.displayname}
                                <p className={`${styles.mostiki_text} unic_color`}>
                                    {type.price} <MostikiSvg/>
                                </p>
                            </label>
                        ))}
                    </form>

                    <form className={styles.box}>
                        <h3 className={`${styles.heading} unic_color center_text`}>
                            Дроп
                        </h3>
                        {Drops
                            .filter(Drop => Drop.name !== "suffix")
                            .map((type) => (
                                <label key={type.name} className={`${styles.select_item} no_select`}>
                                    <input
                                        type="radio" value={type.name} name="select_drop"
                                        checked={drop === type.name}
                                        className={styles.select_input}
                                        disabled={isRolling}
                                        onChange={() => setSettingDrop(type.name)}
                                        onLoad={() => setSettingDrop(drop)}
                                    />
                                    {type.displayname}
                                    <p className={`${styles.mostiki_text} unic_color`}>
                                        {type.price} <MostikiSvg/>
                                    </p>
                                </label>
                            ))}
                    </form>
                </div>
            </div>

            <RollButton
                user={user} price={price}
                isRolling={isRolling}
                isWin={isWin}
                Roll={Roll} Win={Win}
            />

            <div>
                <p>
                    Косметика автоматически выдаётся<br/>
                    и записывается в{" "}
                    <Link
                        href={user ? `/user/${user?.name}/history` : "/auth"}
                        className="unic_color medium-font"
                    >
                        вашу историю
                    </Link>
                </p>
                <br/>
                <p>
                    Для использования косметики:
                </p>
                <ul>
                    <li>
                        Зайдите на сервер
                    </li>
                    <li>
                        Введите <code className="all_select">/uc menu</code>
                    </li>
                </ul>
            </div>
        </MaxSize>
    )
}

function SelectedItem(
    {items, selectedItem}: {
        items: Info[],
        selectedItem: number
    }) {
    if (!items[selectedItem]?.Item) {
        return (
            <div className={styles.box}>
                <p className={styles.text}>
                    Наведите на картинку рулетки, чтобы увидеть характеристику
                </p>
            </div>
        )
    }

    return (
        <div className={styles.box} key={items[selectedItem]?.Item?.name}>
            <h3 className={`${styles.text} ${styles.min_height} unic_color`}>
                {items[selectedItem]?.Item?.displayname}
            </h3>
            <p className={styles.text}>
                Редкость:<br/>
                <span className={`${items[selectedItem]?.rarity || ""}`}>
                    {RarityNames[items[selectedItem]?.rarity || "common"]}
                </span>
            </p>
            <p className={`${styles.text} ${styles.min_height} ${items[selectedItem]?.rarity || ""}`}>
                {items[selectedItem]?.DropItem?.description}
            </p>
        </div>
    )
}

function Account({user, price}: { user: User | null, price: number }) {
    if (!user) {
        return (
            <Link href="/auth" className="red_color">
                Для покупки кейсов нужно создать / войти в аккаунт
            </Link>
        )
    }

    return (
        <>
            <h3><Link href={`/user/${user.name}/history`} className="unic_color">{user.name}</Link></h3>
            <p>
                Баланс: {" "}
                <span className={`${styles.mostiki_text} ${user.mostiki >= price ? "green_color" : "red_color"}`}>
                    {user.mostiki} <MostikiSvg/>
                </span>
            </p>
            <p>Стоимость: <span
                className={`${styles.mostiki_text} ${user.mostiki >= price ? "green_color" : "red_color"}`}>
					{price} <MostikiSvg/>
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

function RollButton(
    {
        isRolling,
        isWin,
        price,
        user,
        Roll,
        Win
    }: RollButton) {
    // Кнопка прокрутки

    if (!user) {
        return (
            <Url href="/auth">
                Войти
            </Url>
        )
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
            <Url href={`/shop/buy?mostiki=${price - user.mostiki}`} danger title={`Не хватает ${price - user.mostiki}м`}>
                Баланс
            </Url>
        )
    }

    // Всё успешно
    return (
        <Button onClick={Roll}>
            Купить
        </Button>
    )
}