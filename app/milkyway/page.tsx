import {H1} from "@components/h1";
import {MaxSize} from "@components/maxSize";
import {validate} from "@services/validate";
import {FormLink} from "@components/formBox";
import styles from "./milkyway.module.scss"

declare module 'csstype' {
    interface Properties {
        '--_size'?: string
        '--_x'?: string
        '--_y'?: string
        '--_long'?: string
        '--_angle'?: string
    }
}

const size = 4.5

const Path = ({rating, now, x, y = 0, next = 0}: {
    rating: number,
    now: number,
    x: number,
    y?: number,
    next?: number
}) => {
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
                '--_y': `${y}rem`,
                '--_long': `${long}rem`,
                '--_angle': `${angle}rad`
            }}
        >
            <div className={styles.box}>
                <h3 className={styles.rating}>
                    {rating}
                </h3>
                <div className={`${styles.line} ${now >= rating ? styles.unic : ""}`}/>
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

    return (
        <MaxSize className="center_text" style={{"--_size": `${size}rem`}}>
            <H1>
                Млечный путь
            </H1>

            <Path now={author.rating} rating={25} x={-15} y={2} next={20}/>
            <Path now={author.rating} rating={50} x={20} y={5} next={-40}/>
            <Path now={author.rating} rating={75} x={-40} y={10} next={20}/>
            <Path now={author.rating} rating={100} x={20}/>
        </MaxSize>
    )
}