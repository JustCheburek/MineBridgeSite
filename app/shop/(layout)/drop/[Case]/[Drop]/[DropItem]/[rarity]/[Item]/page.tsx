import {getCase, getDrop} from "@/services";
import {Img, ImgBox} from "@components/img";
import {Case, Drop, Item, RarityCost, RarityNames, type RarityType} from "@/types/case";
import {validate} from "@services/validate";
import styles from "./item.module.scss"
import {MostikiSvg} from "@ui/SVGS";
import type {Metadata} from "next";
import {redirect} from "next/navigation";
import {H1} from "@components/h1";

type ParamsProp = {
    params: Promise<{
        Case: Case["name"]
        Drop: Drop["name"]
        DropItem: Drop["name"]
        rarity: RarityType
        Item: Item["name"]
    }>
}

export const generateMetadata = async (
    {
        params
    }: ParamsProp
): Promise<Metadata> => {
    const {Case: CaseName, Drop: DropName, DropItem: DropItemName, rarity, Item: ItemName} = await params
    const [Case, Drop, DropItem] = await Promise.all([
        getCase({name: CaseName}),
        getDrop({name: DropName}),
        getDrop({name: DropItemName})
    ])

    let DropTitle = DropItem.displayname
    if (Drop.displayname !== DropItem.displayname) {
        DropTitle += ` (${Drop.displayname})`
    }

    // Items
    let {drop: items} = DropItem
    if (items?.length === 0) {
        items = DropItem[rarity]
    }
    if (items?.length === 0 || !items) {
        redirect(`/shop/drop/${CaseName}/${DropName}/${DropItemName}`)
    }

    const Item = items.find(({name}) => name === ItemName)
    if (!Item) {
        redirect(`/shop/drop/${CaseName}/${DropName}/${DropItemName}/${rarity}`)
    }

    return {
        title: `${Item.displayname} • ${Case.displayname} кейс • ${RarityNames[rarity]} дроп: ${DropTitle}`,
        description: `${Item.displayname}! ${RarityNames[rarity]} дроп: ${DropTitle}. ${Case.displayname} кейс.`
    }
}

export default async function ShowCase(
    {params}: ParamsProp
) {
    const {Case: CaseName, Drop: DropName, DropItem: DropItemName, rarity, Item: ItemName} = await params
    const {user, isHelper} = await validate()

    const [Case, Drop, DropItem] = await Promise.all([
        getCase({name: CaseName}),
        getDrop({name: DropName}),
        getDrop({name: DropItemName})
    ])

    // Items
    let {drop: items} = DropItem
    if (items?.length === 0) {
        items = DropItem[rarity]
    }
    if (items?.length === 0 || !items) {
        redirect(`/shop/drop/${CaseName}/${DropName}/${DropItemName}`)
    }

    const Item = items.find(({name}) => name === ItemName)
    if (!Item) {
        redirect(`/shop/drop/${CaseName}/${DropName}/${DropItemName}/${rarity}`)
    }

    const fullPrice = DropItem?.price * 2 + RarityCost[rarity]

    let userHave = 0
    if (user) {
        userHave = user.casesPurchases.reduce((accum, purchase) => {
            if (purchase.Item === Item._id) {
                accum += 1
            }
            return accum
        }, 0)
    }

    return (
        <div>
            <H1 paths={[
                {displayname: "Магазин", name: "shop", hide: true},
                {displayname: "Дроп", name: "drop", hide: true},
                {displayname: `${Case.displayname} кейс`, name: Case.name},
                {displayname: Drop.displayname, name: Drop.name},
                {displayname: DropItem.displayname, name: DropItem.name},
                {displayname: `${RarityNames[rarity]} дроп`, name: rarity},
                {displayname: Item.displayname, name: Item.name}
            ]}>
                {Item?.displayname}
            </H1>

            <div className={styles.item}>
                {Item.name !== "suffix"
                    ? <ImgBox className={`border-radius ${rarity}_box`} hover width="280px" height="160px">
                        <Img src={`/shop/${DropItem.name}/${Item.name}.webp`} alt={Item.displayname}/>
                    </ImgBox>
                    : <p
                        className={`border-radius grid_center center_text ${rarity}_box`}
                        style={{width: "280px", height: "160px"}}
                    >
                        Суффикс
                    </p>
                }
                <div className={styles.left_text}>
                    <p className={rarity}>
                        {RarityNames[rarity]}
                    </p>
                    <p>
                        {DropItem?.description}
                    </p>
                    <p>
                        Конечная цена: {fullPrice} <MostikiSvg/>
                    </p>
                    <p>
                        У вас есть: {userHave}
                    </p>
                </div>
            </div>
            <div className={styles.case}>
                <ImgBox hover overflow={false}>
                    <Img
                        src={`/shop/${Case.name}.png`} alt={`${Case.displayname} кейс`}
                        width={185}
                    />
                </ImgBox>
                <div className={styles.right_text}>
                    <p>
                        {Case?.displayname}
                    </p>
                    <p>
                        {Drop?.displayname}
                    </p>
                    <p>
                        {Case?.price + Drop?.price} <MostikiSvg/>
                    </p>
                </div>
            </div>
            {isHelper &&
              <small className="light_gray_color flex_center all_select">
                ultracosmetics.{DropItem.name}.{Item.name}
              </small>
            }
        </div>
    )
}