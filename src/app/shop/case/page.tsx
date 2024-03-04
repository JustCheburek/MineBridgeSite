// React
import {useEffect, useRef, useState} from "react";

// Стили
import "./styles/case.scss"

// Компоненты
import {Roll} from "./roll";
import {LeftContainer} from "./left_container";
import {RightContainer} from "./right_container";
import {RollButton} from "./roll_button";

// Скрипт
import {Case, RarityCase, RarityTranslate} from "./db";
import {getSumChances} from "@app/utils";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "MineBridge",
    description: "Лучший нелицензионный майнкрафт сервер на новых версиях",
};

export function Component() {
    const amount = 50 // кол-во предметов
    const result = amount - 2 // какой по счёту выигрышный

    const [price, setPrice] = useState(10)
    const [selectedItem, setSelectedItem] = useState(0)
    const [isRolling, setIsRolling] = useState(false)
    const [isWin, setIsWin] = useState(false)

    /**
     * Генерирует случайное число в диапазоне от 0 до указанного max_number.
     *
     * @param {number} maxNumber - Максимальное число, для которого необходимо сгенерировать случайное число.
     * @return {number} - Случайное число
     */
    const getRandomNumber = (maxNumber: number) => (
        Math.floor(Math.random() * maxNumber)
    )

    const rollSettings = useRef({
        timeRoll: 25000,
        rollWidth: 16050 + getRandomNumber(200)
    })

    const caseSettings = useRef({
        rarity: "common",
        type: "all"
    })

    // Создание массива, где значения не зависят друг от друга
    const [items, setItems] = useState([])

    const caseType = RarityCase.find(rarity =>
        rarity.name === caseSettings.current.rarity
    )
    const sumChances = useRef({
        case: getSumChances(
            caseType.drop
        ),
        rarities: getSumChances(
            caseType.rarity
        )
    })

    /**
     * Функция выдаёт рандомный value из списка
     * @param {array: [{chance: number}]} array - массив
     * @param {number || null} allChances - количество процентов
     * @return {object}
     */
    function getRandomValue(
        array,
        allChances = null
    ) {
        if (typeof array !== "object") {
            console.error("Не массив")
        }

        if (array.length <= 1) {
            return array[0]
        }

        const randomChance = getRandomNumber(allChances || array.length)

        // Нахождение шанса выпавшего предмета по редкости
        if (allChances) {
            let id = 0;
            // Пока шанс не будет равен random_chance
            for (let chance = array[0].chance; chance <= randomChance; chance += array[id].chance) {
                // Прибавляем айди
                id++;
            }

            return array[id]
        }

        return array[randomChance]
    }

    const update = () => {
        const caseType = RarityCase.find(rarity =>
            rarity.name === caseSettings.current.rarity
        )

        let drop

        // Поиск полной информации по названию типа дропа
        if (caseSettings.current.type !== "all") {
            drop = Case.find((item) =>
                item.name === caseSettings.current.type
            )
        }

        const itemsRestart = []

        for (let itemIndex = 0; itemIndex < amount; itemIndex++) {
            const item = {}

            // Предустановленный тип дропа пользователем
            if (caseSettings.current.type !== "all") {
                item.type = drop
            } else {
                // Получение название рандомного типа
                const randomType = getRandomValue(
                    caseType.drop,
                    sumChances.current.case
                ).name

                // Поиск полной информации по названию типа дропа
                item.type = Case.find((item) =>
                    item.name === randomType
                )
            }

            // Редкость
            item.rarity = {
                // Если установленная редкость
                name: item.type?.defaultRarity
                    // Если установленной редкости нет, то устанавливаем рандомную
                    || getRandomValue(
                        caseType.rarity,
                        sumChances.current.rarities
                    ).name
            }

            // Перевод
            item.rarity.displayname = RarityTranslate[item.rarity.name]

            // Дроп
            item.drop = getRandomValue(
                // Если 1 вариация дропа
                item.type?.drop
                // Если дроп разбит на редкости
                || item.type[item.rarity.name]
            )

            // Если есть картинка
            item.img = !item.drop.noImg
                ? `/shop/${item.type.name}/${item.drop.name}.webp`
                : null

            itemsRestart.push(item)
        }

        // Смена предметов
        setItems(itemsRestart)
        setSelectedItem(0)
    }

    const setCaseSetting = (key, value) => {
        caseSettings.current = {
            ...caseSettings.current,
            [key]: value
        }

        const caseType = RarityCase.find(rarity =>
            rarity.name === caseSettings.current.rarity
        )
        const dropPrice = caseSettings.current.type !== "all"
            ? Case.find(dropType => dropType.name === caseSettings.current.type).price
            : 0

        sumChances.current = {
            case: getSumChances(caseType.drop),
            rarities: getSumChances(caseType.rarity)
        }

        setPrice(caseType.price + dropPrice)
        update()
    }

    useEffect(() => {
        update()
    }, [])

    return (
        <main
            className="case medium-font"
            style={{
                "--roll-time": `${rollSettings.current.timeRoll}ms`,
                "--roll-width": `-${rollSettings.current.rollWidth}px`
            }}
        >
            <MaxSize>
                <Helmet>
                    <title>Магазин > Кейсы | Майнбридж</title>
                    <meta
                        charSet="UTF-8"
                        content="Здесь можно расслабится и покрутить кейсы. Интересно, что же вам выпадет?"
                        name="description"
                    />
                </Helmet>

                {/* Контейнер с рулеткой и информацией */}
                <div className="main_container">
                    <LeftContainer selectedItem={selectedItem} price={price} items={items}/>

                    {/* Визуальный контейнер */}
                    <Roll
                        result={result}
                        setSelectedItem={setSelectedItem}
                        items={items}
                        isRolling={isRolling}
                        isWin={isWin}
                        selectedItem={selectedItem}
                    />

                    {/* Выбор кейса */}
                    <RightContainer isRolling={isRolling} caseSettings={caseSettings} setCaseSetting={setCaseSetting}/>
                </div>

                {/* Кнопка */}
                <RollButton
                    isRolling={isRolling} isWin={isWin} items={items} setSelectedItem={setSelectedItem}
                    setIsRolling={setIsRolling} result={result} rollSettings={rollSettings} update={update}
                    setIsWin={setIsWin} getRandomNumber={getRandomNumber} price={price} caseSettings={caseSettings}
                />
            </MaxSize>
        </main>
    )
}