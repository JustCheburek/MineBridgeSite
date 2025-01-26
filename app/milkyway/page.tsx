import {H1} from "@components/h1";
import {MaxSize} from "@components/maxSize";
import {validate} from "@services/validate";
import {FormLink} from "@components/formBox";
import styles from "./milkyway.module.scss"
import type {Metadata} from "next";
import {StarSvg} from "@ui/SVGS";
import {Img, ImgBox} from "@/ui/components/img";
import {CaseData} from "@/types/purchase";

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

type Path = {
    rating: number
    now: number
    x: number
    caseData: CaseData
    next?: number
}

type PathWithRating = Path & {rating: number}

const Path = ({rating, now, x, caseData: {rarity, DropItem, Item}, next = 0}: PathWithRating) => {
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
                        hover
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

export default async function MilkyWay() {
    const {user: author} = await validate()

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

    /*const Paths: Path[] = [{
        rating: 25,
        x: -50,
        caseData: {

        },
        next: 40
    }, {
        rating: 50,
        x: 40,
        caseData: {},
        next: -40
    }, {
        rating: 75,
        x: -40,
        caseData: {},
        next: 20
    }, {
        rating: 100,
        x: 20,
        caseData: {}
    }]*/

    return (
        <div className="center_text" style={{"--_size": `${size}rem`, '--_y': `${y}rem`}}>
            <H1>
                Млечный путь
            </H1>

            <div className={styles.gradient_gray_black}/>

            {/*<div className={styles.milky_way}>
                {Paths.map(({rating, x, caseData, next}, i) => (
                    <Path
                        key={i}
                        rating={rating}
                        now={author.rating}
                        x={x}
                        caseData={caseData}
                        next={next}
                    />
                ))}
            </div>*/}
        </div>
    )
}