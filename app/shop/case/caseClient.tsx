"use client"

// Next и сервер
import type {MouseEventHandler} from "react";
import {useEffect, useRef, useState} from "react";
import type {CaseType, DropType, Info} from "@/types/case";
import {Case, Drop, RarityNames} from "@/types/case";
import {User} from "lucia";
import Link from "next/link";

// Стили
import styles from "./case.module.scss"

// Компоненты
import {MaxSize} from "@components/maxSize";
import {Random, RandomValue, SumChances} from "@app/utils";
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
}

export function CaseClient({Cases, Drops, user, Add}: CaseClient) {
    const AMOUNT = 50
    const RESULT = AMOUNT - 2

    const [isRolling, setIsRolling] = useState(false)
    const [isWin, setIsWin] = useState(false)
    const [selectedItem, setSelectedItem] = useState(0)

    const rollSettings = useRef<rollSettings>({
        timeRoll: 20000,
        rollWidth: 16050 + Random(200)
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

    function Update() {
        const {caseType} = getInfo()

        const infos: Info[] = []
        let dropDefault

        if (drop !== "all") {
            dropDefault = Drops.find(({name}) => name === drop)
        }

        for (let itemIndex = 0; itemIndex < AMOUNT; itemIndex++) {
            const info: Info = {
                DropItem: dropDefault
            }

            // Drop
            if (!dropDefault) {
                const randomDrop = RandomValue(caseType.drop, sumChances.current.drop).name
                info.DropItem = Drops.find(({name}) => name === randomDrop)
            }

            if (!info.DropItem) return console.error("Drop не найден")

            // Rarity
            info.rarity = info.DropItem?.defaultRarity ||
                RandomValue(caseType.rarity, sumChances.current.drop).name

            // Items
            let {drop: items} = info.DropItem
            if (items?.length === 0) {
                items = info.DropItem[info.rarity]
            }

            if (!items) return console.error("Items не найден")
            info.Item = items[Random(items.length)]

            // Картинка
            info.img = info.Item?.img
                ? `/shop/${info.DropItem.name}/${info.Item.name}.webp`
                : undefined

            infos.push(info)
        }

        // Смена
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
        >
            <H1 paths={[
                {displayname: "Магазин", name: "shop"},
                {displayname: "Кейсы", name: "case"},
            ]}>
                Кейсы
            </H1>

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
                            Тип кейса
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
                            Тип дропа
                        </h3>
                        {Drops.map((type) => (
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
            <Button disabled>
                Баланс
            </Button>
        )
    }

    // Всё успешно
    return (
        <Button onClick={Roll}>
            Купить
        </Button>
    )
}