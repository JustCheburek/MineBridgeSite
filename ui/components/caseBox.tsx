"use client";

// Типы
import {Case, Drop} from "@/types/case";

// Стили
import styles from "./styles/caseBox.module.scss"

// Компоненты
import {Img, ImgBox, type ImgBoxProps} from "@components/img";

type CaseBoxProps = {
    Case: Case
    size?: number
} & ImgBoxProps
export function CaseBox({Case, size = 185, children, ...props}: CaseBoxProps) {
    return (
        <ImgBox className={styles[Case.name]} hover overflow={false} {...props}>
            <Img
                src={`/shop/${Case.name}.png`} alt={`${Case.displayname} кейс`}
                width={size}
            />
            {children}
        </ImgBox>
    )
}

