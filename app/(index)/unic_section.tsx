// React
import type {PropsWithChildren} from "react";

// Стили
import styles from "./styles/unic.module.scss"

// Компоненты
import {Img, ImgBox} from "@components/img";

const Box = ({children}: PropsWithChildren) => {
    return (
        <article className={`${styles.unic} appear`}>
            {children}
        </article>
    )
}

const UnicSection = () => (
    <section className={`${styles.unic_section} center_text`}>
        <div className={`${styles.unic_div}`}>
            {/* Цена */}
            <Box>
                <ImgBox className={styles.barrier} background="/index/unic/barrier.webp" width="172px" height="175px">
                    <Img width={80} height={80} src="/index/unic/moneta.webp" alt="Монета" className={styles.moneta}
                         pixel/>
                </ImgBox>
                <p>
                    Бесплатная<br/>
                    проходка
                </p>
            </Box>

            {/* Кастомизация */}
            <Box>
                <Img src="/index/unic/amogus.webp" alt="Амогус" width={170} className={styles.amogus} pixel/>
                <p>
                    Уникальная<br/>
                    кастомизация
                </p>
            </Box>

            {/* Ивенты */}
            <Box>
                <Img src="/index/unic/calendar.webp" alt="Календарь" width={170} className={styles.calendar} pixel/>
                <p>
                    Интересные<br/>
                    ивенты
                </p>
            </Box>

            {/* Комьюнити */}
            <Box>
                <Img src="/index/unic/heart.webp" alt="heart" width={170} className={styles.heart} pixel/>
                <p>
                    Дружелюбное<br/>
                    комьюнити
                </p>
            </Box>
        </div>
    </section>
)

export default UnicSection