"use client"

import {useState} from "react";
import styles from "./headbreak.module.scss"
import {FormBox, FormButton, FormLabel} from "@components/formBox";
import {Random} from "@app/utils";
import {GetPrize} from "@services/user";

type Element = "" | "⚪" | "❌" | "❓️" | "❔"
type Path = Element[]
type Buttons = Path[]

export function HeadBreakBox({name}: {name: string}) {
    const [step, setStep] = useState(0)
    const [nextStep, setNextStep] = useState<boolean>(false)
    const steps: { path: Path, buttons: Buttons }[] = [
        {
            path: ["", "", "", "", ""] as Path,
            buttons: [
                ["❌", "⚪", "", "❌", "⚪"],
                ["⚪", "❌", "", "", "⚪"],
                ["", "", "⚪", "", ""],
                ["⚪", "", "", "❌", "⚪"],
                ["", "", "❌", "⚪", ""],
                ["❌", "", "", "⚪", "⚪"]
            ]
        },
        {
            path: ["", "", "", "", "", "", "", "", ""],
            buttons: [
                ["⚪", "", "❓️", "❌", "⚪", "", "", "", "❓️", ""],
                ["⚪", "❔", "❓️", "⚪", "❌", "", "❌", "❓️", "❓️", "⚪"],
                ["❓️", "", "⚪", "❌", "", "⚪", "⚪", "", "❓️", "⚪"],
                ["⚪", "", "❌", "⚪", "❔", "", "❓️", "❓️", "❓️", "⚪"],
                ["", "⚪", "", "❓️", "⚪", "", "", "⚪", "❔", "❓️"]
            ]
        }, {
            path: [],
            buttons: [
                []
            ]
        }
    ]
    const [path, setPath] = useState<Path>(
        steps[step].path
    )

    const updatePath = (path: Path) => {
        setPath((prev: Path) => {
            const newPath = path.reduce<Path>((acc, current, i) => {
                if (current === "⚪") {
                    acc.push("⚪");
                } else if (current === "❌") {
                    acc.push("");
                } else if (current === "❓️") {
                    const random = Random(2)
                    acc.push(random === 0 ? "⚪" : "");
                } else if (current === "❔") {
                    const random = Random(2)
                    acc.push(random === 0 ? prev[i] : "");
                } else {
                    acc.push(prev[i]);
                }
                return acc;
            }, [])
            setNextStep(
                newPath.filter(element => element === "").length === 0
            )
            return newPath
        })
    }

    return (
        <>
            {step < 2
                ? <>
                    <h3 className={`${styles.mobile} center_text`}>
                        Зайдите с устройства большего размера для наилучшего экспериенса
                    </h3>

                    <div className={`${styles.path} ${styles.main_path}`}>
                        {path.map((e, index) => (
                            <p key={index} className={`unic_color flex_center ${styles.element}`}>
                                {e}
                            </p>
                        ))}
                    </div>

                    {steps[step].buttons.map((path, index) => (
                        <label className={styles.path} key={index}>
                            {path.map((e, index) => (
                                <button
                                    key={index}
                                    className={styles.element}
                                    onClick={() => {
                                        updatePath(path)
                                    }}
                                >
                                    {e}
                                </button>
                            ))}
                        </label>
                    ))}
                    <FormBox action={() => {
                        setPath(steps[step + 1].path)
                        setStep(step + 1)
                        setNextStep(false)
                    }}>
                        <FormLabel>
                            <FormButton disabled={!nextStep}>
                                Дальше
                            </FormButton>
                        </FormLabel>
                    </FormBox>
                </>
                : <>
                    <h2 className="center_text">
                        Завершено
                    </h2>

                    <p>
                        Перед получением нужно зайти на майнбридж на выживание
                    </p>
                    <p>
                        Получить награду можно только 1 раз
                    </p>

                    <FormBox action={() => GetPrize(name)}>
                        <FormLabel>
                            <FormButton>
                                Получить награду
                            </FormButton>
                        </FormLabel>
                    </FormBox>
                </>
            }
        </>
    )
}