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
import dynamic from "next/dynamic";
import {revalidateTag} from "next/cache";

const Avatar = dynamic(() => import("@components/avatar"));

declare module 'csstype' {
    interface Properties {
        '--_size'?: string
        '--_x'?: string
        '--_y'?: string
        '--_long'?: string
        '--_complete'?: string
        '--_angle'?: string
    }
}

export const metadata: Metadata = {
    title: "Млечный путь",
    description: "Набирая звёзды, можно получать разные крутые вещи бесплатно!"
};

const size = 3.5
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
    let complete = 0
    if (index < Paths.length - 1) {
        const nextPath = Paths[index + 1]
        next = nextPath.x
        difference = nextPath.rating - rating
    }

    // Права
    const isPerm = author.casesPurchases.some(
        (casePurchase) => {
            if (suffix) {
                return casePurchase.suffix === suffix
            }
            return casePurchase.Item.toString() === Item._id.toString()
        }
    )

    const isHas = author.rating >= rating

    // Последняя не создаёт линию
    const last = Paths[Paths.length - 1].rating
    if (last !== rating) {
        const width = Math.abs(x - next) + size
        const height = (y + size) * 2
        long = Math.sqrt(width ** 2 + height ** 2) / 2.1
        angle = Math.atan2(
            height + 1.5,
            width * (next > x ? 1 : -1)
        )

        const have = author.rating - rating
        const percent = (difference - have) / difference
        // complete <= long
        complete = Math.min(long - long * percent, long)
    }

    return (
        <div
            className={styles.container}
            style={{
                '--_x': `${x}rem`,
                '--_long': `${long}rem`,
                '--_complete': `${complete}rem`,
                '--_angle': `${angle}rad`
            }}
        >
            <div className={`${styles.box} ${isHas ? styles.unic : ""}`}>
                <div className={styles.card}>
                    {isHas && !suffix &&
                      <div className={`${styles.text_box} ${x <= 0 ? styles.left : styles.right}`}>
                        <div className={styles.text}>
                          <h2 className={styles.heading}>
                              {suffix || Item.displayname}
                          </h2>
                          <p>
                              {DropItem.description}
                          </p>
                          <GetButton
                            author={author}
                            isPerm={isPerm}
                            caseData={caseData}
                          />
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
                        : <div
                            className={`${styles.item} grid_center ${rarity}_box`}
                            style={{width: "18rem", height: "18rem"}}
                        >
                            <div>
                                <h2>
                                    {isHas
                                        ? suffix
                                        : "Суффикс?"
                                    }
                                </h2>
                                <p>
                                    {DropItem.description}
                                </p>
                            </div>
                            {isHas &&
                              <GetButton
                                author={author}
                                isPerm={isPerm}
                                caseData={caseData}
                              />
                            }
                        </div>
                    }
                </div>
                <div className={styles.circle}/>
                <h3 className={`yellow_color ${styles.rating} ${styles.path_rating}`}>
                    {rating} <StarSvg width="0.9em" height="0.9em"/>
                </h3>
                {difference > 0 && <>
                  <div className={styles.line}/>
                  <div className={styles.complete}/>
                </>}
                {complete > 0 && complete < long &&
                  <div className={styles.player}>
                    <div className={styles.player_card}>
                      <Avatar src={author.photo} width={120}/>
                      <h3 className={`yellow_color ${styles.rating}`}>
                          {author.rating} <StarSvg width="0.9em" height="0.9em"/>
                      </h3>
                    </div>
                  </div>
                }
            </div>
        </div>
    )
}

type GetButton = {
    author: User
    isPerm: boolean
    caseData: CaseData
}

function GetButton({author, isPerm, caseData}: GetButton) {
    if (isPerm) {
        return (
            <Button margin="1.2rem" disabled className={styles.button}>
                Получено
            </Button>
        )
    }

    return (
        <Form action={async () => {
            "use server"
            await AddCasePurchase(author._id, caseData)
            await GetCosmetic(author.name, caseData)
        }}>
            <Button margin="1.2rem" className={styles.button}>
                Получить
            </Button>
        </Form>
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
        <div className={`${styles.milkyway_container} center_text`}
             style={{"--_size": `${size}rem`, '--_y': `${y}rem`}}>
            <H1 up reload={async () => {
                "use server";
                revalidateTag("all")
            }}>
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