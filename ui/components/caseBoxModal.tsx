"use client"

import {useState} from "react";
import {Case, Drop, RarityNames} from "@/types/case";
import {SumChances} from "@app/utils";
import styles from "./styles/caseBox.module.scss";
import {Modal} from "@components/modal";
import {H1} from "@components/h1";
import {CaseBox} from "@components/caseBox";
import type {ImgBoxProps} from "@components/img";

type CaseBoxWithModalProps = {
    Case: Case
    Drops: Drop[]
    size?: number
} & ImgBoxProps

export function CaseBoxWithModal(
    {
        Case,
        Drops,
        size = 185,
        helper = true,
        children
    }: CaseBoxWithModalProps) {
    const chancesRarity = SumChances(Case.rarity)
    const chancesDrop = SumChances(Case.drop)
    const [modal, setModal] = useState(false)

    return (<>
        <CaseBox
            Case={Case} size={size} helper={helper} onClick={() => setModal(true)} hover>
            {children}
        </CaseBox>
        <Modal modal={modal} setModal={setModal}>
            <H1>{Case.displayname}</H1>
            <div className={styles.case_info}>
                <div className={styles.rarity}>
                    <h2 className="unic_color">
                        Редкости
                    </h2>
                    {Case.rarity.map(rarity => {
                        const translate = RarityNames[rarity.name]

                        return (
                            <p key={rarity.name}>
                                {translate} - {Math.round(rarity.chance / chancesRarity * 1000) / 10}%
                            </p>
                        )
                    })}
                </div>
                <div className={styles.drop}>
                    <h2 className="unic_color">
                        Дроп
                    </h2>
                    {Case.drop.map(drop => {
                        const Drop = Drops.find(({name}) =>
                            name === drop.name
                        )

                        if (!Drop) {
                            return (
                                <p key={drop.name}>
                                    Неизвестный дроп - {drop.name}
                                </p>
                            )
                        }

                        return (
                            <p key={drop.name}>
                                {Drop.displayname} - {Math.round(drop.chance / chancesDrop * 1000) / 10}%
                            </p>
                        )
                    })}
                </div>
            </div>
        </Modal>
    </>)
}
