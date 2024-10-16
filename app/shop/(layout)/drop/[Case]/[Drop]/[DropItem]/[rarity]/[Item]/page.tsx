import {getCase, getDrop} from "@/services";
import {H1} from "@components/h1";
import {Img, ImgBox} from "@components/img";
import {Case, Drop, Item, RarityNames, type RarityType} from "@/types/case";
import {validate} from "@services/validate";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";
import styles from "./item.module.scss"
import {MostikiSvg} from "@ui/SVGS";
import type {Metadata} from "next";
import {redirect} from "next/navigation";

type ParamsProp = {
    params: {
        Case: Case["name"]
        Drop: Drop["name"]
        DropItem: Drop["name"]
        rarity: RarityType
        Item: Item["name"]
    }
}

export const generateMetadata = async (
    {
        params: {Case: CaseName, Drop: DropName, DropItem: DropItemName, rarity, Item: ItemName}
    }: ParamsProp
): Promise<Metadata> => {
    const Case = await getCase({name: CaseName})
    const Drop = await getDrop({name: DropName})
    const DropItem = await getDrop({name: DropItemName})

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

    const title = `${Item.displayname} • ${Case.displayname} кейс • ${RarityNames[rarity]} дроп: ${DropTitle}`
    const description = `${Item.displayname}! ${RarityNames[rarity]} дроп: ${DropTitle}. ${Case.displayname} кейс.`

    return {
        title, description,
        openGraph: {title, description},
        twitter: {title, description}
    }
}

export default async function ShowCase(
    {
        params: {
            Case: CaseName,
            Drop: DropName,
            DropItem: DropItemName,
            rarity,
            Item: ItemName
        }
    }: ParamsProp) {
    const {user} = await validate(cookies().get(lucia.sessionCookieName)?.value)

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

    let amount = 0

    if (user) {
        amount = user.casesPurchases.reduce((accum, purchase) => {
            if (purchase.Item === Item._id) {
                accum += 1
            }
            return accum
        }, 0)
    }

    return (
        <div>
            <h1>
                {Item?.displayname}
            </h1>
            <div className={styles.item}>
                {DropItem.name !== "suffix"
                    ? <ImgBox className={`border-radius ${rarity}_box`} hover width="280px" height="160px">
                        <Img src={`/shop/${DropItem.name}/${Item.name}.webp`} alt={Item.displayname}/>
                    </ImgBox>
                    : <div
                        className={`flex_center border-radius ${rarity}_box`}
                        style={{width: "280px", height: "160px"}}
                    >
                        <p>
                            Выберите суффикс<br/>
                            <small>
                                (в разработке)
                            </small>
                        </p>
                    </div>
                }
                <div className={styles.left_text}>
                    <p className={rarity}>
                        {RarityNames[rarity]}
                    </p>
                    <p>
                        {DropItem?.displayname}
                    </p>
                    <p>
                        У вас есть: {amount} {/*{amount > 0 && <ShareSvg/>}*/}
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
        </div>
    )
}