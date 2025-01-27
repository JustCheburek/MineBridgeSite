import {H1} from "@components/h1";
import {MaxSize} from "@components/maxSize";
import {validate} from "@services/validate";
import {FormLink} from "@components/formBox";
import styles from "./milkyway.module.scss"
import type {Metadata} from "next";
import {StarSvg} from "@ui/SVGS";
import {Img, ImgBox} from "@/ui/components/img";
import {getDropLocal, getDrops, getItem, getItems} from "@/services";
import {Drop, Item, RarityType} from "@/types/case";

declare module 'csstype' {
    interface Properties {
        '--_size'?: string
        '--_x'?: string
        '--_y'?: string
        '--_long'?: string
        '--_angle'?: string
    }
}

export const metadata: Metadata = {
    title: "Млечный путь",
    description: "Набирая звёзды, можно получать разные крутые вещи бесплатно!"
};

const size = 3.5
const y = 15

interface Path {
    rating: number
    x: number
    next?: number
}

interface PathID extends Path {
    caseData: {
        Item: string
        DropItem: string
        rarity: RarityType
    }
}

interface PathDB extends Path {
    caseData: {
        Item: Item
        DropItem: Drop
        rarity: RarityType
    }
    now: number
}

const Path = ({rating, now, x, caseData: {rarity, DropItem, Item}, next = 0}: PathDB) => {
    let long = 0
    let angle = 0

    if (next !== 0) {
        const width = Math.abs(x) + Math.abs(next) + size
        const height = (y + size) * 2
        long = Math.sqrt(width ** 2 + height ** 2) / 2
        angle = Math.atan2(
            height,
            next > x
                ? width
                : -width
        )
    }

    return (
        <div
            className={styles.container}
            style={{
                '--_x': `${x}rem`,
                '--_long': `${long}rem`,
                '--_angle': `${angle}rad`
            }}
        >
            <div className={`${styles.box} ${now >= rating ? styles.unic : ""}`}>
                <div className={styles.card}>
                    <ImgBox
                        className={`${styles.item} ${rarity}_box`}
                        hover width="12rem" height="12rem"
                    >
                        <Img
                            src={`/shop/${DropItem.name}/${Item.name}.webp`}
                            alt={Item.displayname || DropItem.name || ""}
                            className={styles.img}
                        />
                    </ImgBox>
                </div>
                <div className={styles.circle}/>
                <h3 className={`yellow_color ${styles.rating}`}>
                    {rating} <StarSvg width="0.9em" height="0.9em"/>
                </h3>
                <div className={styles.line}/>
            </div>
        </div>
    )
}

const Paths: PathID[] = [{
    rating: 25,
    x: -50,
    caseData: {
        Item: "662ddb0f8d5044c0b4ad7b5a",
        DropItem: "662ddb0f8d5044c0b4ad7b57",
        rarity: "common"
    },
    next: 40
}, {
    rating: 50,
    x: 40,
    caseData: {
        Item: "662ddb0f8d5044c0b4ad7b5a",
        DropItem: "662ddb0f8d5044c0b4ad7b57",
        rarity: "common"
    },
    next: -40
}, {
    rating: 75,
    x: -40,
    caseData: {
        Item: "662ddb0f8d5044c0b4ad7b5a",
        DropItem: "662ddb0f8d5044c0b4ad7b57",
        rarity: "common"
    },
    next: 20
}, {
    rating: 100,
    x: 20,
    caseData: {
        Item: "662ddb0f8d5044c0b4ad7b5a",
        DropItem: "662ddb0f8d5044c0b4ad7b57",
        rarity: "common"
    }
}]

export default async function MilkyWay() {
    const [Drops, {user: author}] = await Promise.all([
        getDrops(),
        validate()
    ])

    if (!author) {
        return (
            <MaxSize className="center_text">
                <H1>Млечный путь</H1>

                <FormLink href="/auth">
                    Войти в акк
                </FormLink>
            </MaxSize>
        )
    }

    return (
        <div className="center_text" style={{"--_size": `${size}rem`, '--_y': `${y}rem`}}>
            <H1>
                Млечный путь
            </H1>

            <div className={styles.gradient_gray_black}/>

            <div className={styles.milky_way}>
                {Paths.map(async ({rating, x, caseData, next}, i) => {
                    const DropItem = await getDropLocal({_id: caseData.DropItem}, Drops)
                    const Items = await getItems(caseData.rarity, DropItem)
                    const Item = await getItem({_id: caseData.Item}, Items)

                    if (!DropItem || !Item) {
                        return
                    }

                    return (
                        <Path
                            key={i}
                            rating={rating}
                            now={author.rating}
                            x={x}
                            caseData={{
                                ...caseData,
                                Item,
                                DropItem
                            }}
                            next={next}
                        />
                    )
                })}
            </div>
        </div>
    )
}