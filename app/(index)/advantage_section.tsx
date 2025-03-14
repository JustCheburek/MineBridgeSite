// React
import type {PropsWithChildren} from "react";
import Link from "next/link";

// Стили
import styles from "./styles/advantage.module.scss"

// Компоненты
import {Img, ImgBox} from "@components/img";
import {MaxSize} from "@components/maxSize";

/*
export function Video({name}) {
    const play = e => {
        e.target?.play().catch(() => console.error)
    }

    const pause = e => {
        e.target?.pause()
    }

    return (
        <video
            className="video_box blur_box" onMouseEnter={play} onMouseLeave={pause}
            onClick={() => play} muted
        >
            <source
                src={`/index/${name}.mp4`}
                className="video" type="video/mp4"
            />
            <p>
                {name}
            </p>
        </video>
    )
}
*/

const Text = ({children}: PropsWithChildren) => (
    <h4 className={styles.text}>
        {children}
    </h4>
)

const Box = ({children}: PropsWithChildren) => (
    <article
        className={`${styles.advantage} appear`}
    >
        {children}
    </article>
)

const AdvantageSection = () => (
    <section className={styles.advantage_section}>
        <MaxSize className={styles.max_size}>
            {/* Информация о создании групп */}
            <Box>
                <ImgBox className={styles.img_box} type="post" borderRadius="all">
                    <Img
                        src="/index/advantage/group.webp"
                        alt="Ивент пандорума"
                    />
                </ImgBox>
                <Text>
                    Объединяйся в {" "}
                    <Link href="https://discord.com/channels/1012334719230292048/1114389800947036261"
                          className="unic_color" target="_blank">
                        кланы
                    </Link><br/>
                    и играй вместе<br/>
                    со своими друзьями!
                </Text>
            </Box>

            {/* Информация о городах */}
            <Box>
                <ImgBox className={styles.img_box} type="post" borderRadius="all">
                    <Img
                        src="/index/advantage/project.webp"
                        alt="Пандорум здание"
                    />
                </ImgBox>
                <Text>
                    Строй города и фермы<br/>
                    с другими игроками!
                </Text>
            </Box>

            {/* Информация о данжах */}
            <Box>
                <ImgBox className={styles.img_box} type="post" borderRadius="all">
                    <Img
                        src="/index/advantage/dungeon.webp"
                        alt="Эндский данж"
                    />
                </ImgBox>
                <Text>
                    Изучай новые данжи<br/>
                    и структуры!
                </Text>
            </Box>

            {/* Информация о кастомизации */}
            <Box>
                <ImgBox className={styles.img_box} type="post" borderRadius="all">
                    <Img
                        src="/index/advantage/pet.webp"
                        alt="Питомец"
                    />
                </ImgBox>
                <Text>
                    Кастомизируй свой внешний вид!<br/>
                    <Link href="/shop" className="unic_color small medium-font">
                        <small>
                            Купить уникальные украшения
                        </small>
                    </Link>
                </Text>
            </Box>

            {/* Информация о создании проектов */}
            {/*<Box>
            <Img name="project" alt="Проект"/>
            <Text>
                Реализуй то, что всегда хотел,<br/>
                но на что никогда<br/>
                не было времени!
            </Text>
        </Box>*/}
        </MaxSize>
    </section>
)

export default AdvantageSection