"use client";

// React
import type {PropsWithChildren} from "react"
import {useState} from "react";

// Стили
import styles from "./blacklist.module.scss";

// Компоненты
import {Button} from "@components/button";

export function BlacklistContent() {
    const [show, setShow] = useState<boolean>(false);

    return (
        <>
            <Button
                onClick={() =>
                    setShow(prev => !prev)
                }
            >
                {show
                    ? <>Скрыть</>
                    : <>Показать</>
                } выражения
            </Button>

            <ul className={styles.list}>
                <li>
                    <p>
                        Высказывания на основе принадлежности к социальной группе
                    </p>

                    <WordsContainer hidden="×××××, ×××××××, ×××××, ×××××××" show={show}>
                        Пидор, пидорас, педик, гомосек
                    </WordsContainer>
                </li>
                <li>
                    <p>
                        Высказывания по признакам пола, расы
                    </p>

                    <WordsContainer hidden="××××××, ××××××, ×××" show={show}>
                        Ниггер, пендос, жид
                    </WordsContainer>
                </li>
                <li>
                    <p>
                        Высказывания, направленные на разжигание межнациональной розни
                    </p>

                    <WordsContainer hidden="×××××, ×××××, ×××" show={show}>
                        Хохол, кацап, хач
                    </WordsContainer>
                </li>
                <li>
                    <p>
                        В негативном смысле, оскорбление кого-либо
                    </p>

                    <WordsContainer hidden="××××××, ××××, ××××, ×××××, ×××××" show={show}>
                        Аутист, даун, симп, инцел, додик
                    </WordsContainer>
                </li>
            </ul>
        </>
    )
}

export function WordsContainer({children, hidden, show}: PropsWithChildren<{ hidden: string, show: boolean }>) {
    children += " и т. д."
    hidden += " × ×. ×."

    return (
        <div className={`${styles.words_container} no_select`}>
            <small className={`${styles.words} ${show ? styles.show : ''}`}>
                {children}
            </small>
            <small className={`${styles.stars} ${!show ? styles.show : ''}`}>
                {hidden}
            </small>
        </div>
    )
}