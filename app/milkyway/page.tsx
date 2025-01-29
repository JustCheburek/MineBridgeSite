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
import {Button} from "@components/button";
import {SetPermConsole} from "@services/console";
import {User} from "lucia";
import Form from "next/form";
import {revalidateTag} from "next/cache";

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
}

interface PathID extends Path {
    caseData: {
        Item: string
        DropItem: string
        rarity: RarityType
        suffix?: string
    }
}

interface PathDB extends Path {
    caseData: {
        Item: Item
        DropItem: Drop
        rarity: RarityType
        suffix?: string
    }
    author: User
    index: number
}

async function SetPerm(perm: string, name: string) {
    await SetPermConsole(perm, name)
    revalidateTag("userLike")
}

async function Path({rating, author, x, caseData: {rarity, DropItem, Item, suffix}, index}: PathDB) {
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
    const perm = `${DropItem.give}.${DropItem.name}.${Item.name}`
    /*let isPerm = false
    if (DropItem.give) {
        isPerm = await IsPerm(perm, author.name)
    }*/

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
                            {/*{isPerm
                                ? <Button margin="1.2rem" disabled>
                                    Получено
                                </Button>
                                :*/}
                          <Form action={() => SetPerm(perm, author.name)}>
                            <Button margin="1.2rem">
                              Получить
                            </Button>
                          </Form>
                            {/*}*/}
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

const Paths: PathID[] = [{
    rating: 25,
    x: -50,
    caseData: {
        Item: "662ddb0f8d5044c0b4ad7b5a",
        DropItem: "662ddb0f8d5044c0b4ad7b57",
        rarity: "common"
    }
}, {
    rating: 50,
    x: 40,
    caseData: {
        Item: "662de3cd8d5044c0b4ad86fb",
        DropItem: "662de3cd8d5044c0b4ad86fa",
        rarity: "common"
    }
}, {
    rating: 75,
    x: -40,
    caseData: {
        Item: "662de3d68d5044c0b4ad871b",
        DropItem: "662de3d68d5044c0b4ad871a",
        rarity: "epic",
        suffix: "&7молодец"
    }
}, {
    rating: 100,
    x: 20,
    caseData: {
        Item: "662ddb0f8d5044c0b4ad7b5c",
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
                                Item,
                                DropItem
                            }}
                            index={i}
                        />
                    )
                })}
            </div>
        </div>
    )
}