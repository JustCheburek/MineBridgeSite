import {H1} from "@components/h1";
import {MaxSize} from "@components/maxSize";
import {validate} from "@services/validate";
import {FormLink} from "@components/formBox";
import styles from "./milkyway.module.scss"
import type {Metadata} from "next";
import {StarSvg} from "@ui/SVGS";
import {Img, ImgBox} from "@/ui/components/img";
import {getCase, getDropLocal, getDrops, getItem, getItems} from "@/services";
import {RarityType} from "@/types/case";
import {User} from "lucia";
import {CaseData} from "@/types/purchase";
import {Button} from "@components/button";
import {AddCasePurchase, GetCosmetic} from "@services/user";
import Form from "next/form";
import {Paths} from "@/const";
import {PropsWithChildren} from "react";

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

const size = 3
const y = 17

interface Path {
    rating: number
    x: number
}

export interface PathID extends Path {
    caseData: {
        Item: string
        DropItem: string
        rarity: RarityType
        suffix?: string
    }
}

interface PathDB extends Path {
    caseData: CaseData
    author: User
    index: number
}

async function Path({rating, author, x, caseData, index}: PathDB) {
    const {rarity, DropItem, Item, suffix} = caseData
    let long = 0
    let angle = 0
    let next = 0
    let difference = 0
    if (index < Paths.length - 1) {
        next = Paths[index + 1].x
        difference = Paths[index + 1].rating - rating
    }

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

    // Права
    const isPerm = author.casesPurchases.some(
        (casePurchase) =>
            casePurchase.Item.toString() === Item._id.toString()
    )

    const isHas = author.rating >= rating

    return (
        <div
            className={styles.container}
            style={{
                '--_x': `${x}rem`,
                '--_long': `${long}rem`,
                '--_angle': `${angle}rad`
            }}
        >
            <div className={`${styles.box} ${isHas ? styles.unic : ""}`}>
                <div className={styles.card}>
                    {isHas &&
                      <div className={`${styles.text_box} ${x < 0 ? styles.left : styles.right}`}>
                        <div className={`${styles.text} ${rarity}_box`}>
                          <h2>
                              {Item.displayname}
                          </h2>
                            {isPerm
                                ? <Button margin="1.2rem" disabled>
                                    Получено
                                </Button>
                                : <Form action={async () => {
                                    "use server"
                                    await AddCasePurchase(author._id, caseData)
                                    await GetCosmetic(author.name, caseData)
                                }}>
                                    <Button margin="1.2rem">
                                        Получить
                                    </Button>
                                </Form>
                            }
                        </div>
                      </div>
                    }
                    {!suffix
                        ? <ImgBox
                            className={`${styles.item} ${rarity}_box`}
                            hover width="18rem" height="18rem"
                        >
                            <Img
                                src={`/shop/${DropItem.name}/${Item.name}.webp`}
                                alt={Item.displayname || DropItem.name || ""}
                                className={`${styles.img} ${isHas ? "" : styles.blur}`}
                            />
                        </ImgBox>
                        : <h3
                            className={`${styles.item} grid_center border-radius center_text ${rarity}_box`}
                            style={{width: "18rem", height: "18rem"}}
                        >
                            {isHas
                                ? suffix
                                : "Суффикс?"
                            }
                        </h3>
                    }

                </div>
                <div className={styles.circle}/>
                <h3 className={`yellow_color ${styles.rating}`}>
                    {rating} <StarSvg width="0.9em" height="0.9em"/>
                </h3>
                {difference > 0 &&
                  <progress value={author.rating - rating} max={difference} className={styles.line}/>
                }
            </div>
        </div>
    )
}

const Snow = ({children}: PropsWithChildren) => (
    <div className={styles.milkyway_box}>
        <div className={styles.stars_big}>
            <div className={styles.stars_middle}>
                <div className={styles.stars_small}>
                    {children}
                </div>
            </div>
        </div>
    </div>
)

export default async function MilkyWay() {
    const [Case, Drops, {user: author}] = await Promise.all([
        getCase({_id: "662ddba08d5044c0b4ad7bf4"}),
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
        <div className={`${styles.milkyway_container} center_text`} style={{"--_size": `${size}rem`, '--_y': `${y}rem`}}>
            <H1>
                Млечный путь
            </H1>

            <div className={styles.gradient_gray_black}/>

            <Snow>
                {Paths.map(async ({rating, x, caseData}, i) => {
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
                            author={author}
                            x={x}
                            caseData={{
                                ...caseData,
                                Case,
                                Drop: DropItem,
                                Item,
                                DropItem
                            }}
                            index={i}
                        />
                    )
                })}
            </Snow>
        </div>
    )
}