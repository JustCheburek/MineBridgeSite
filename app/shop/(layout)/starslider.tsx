"use client"

import { useState } from "react";
import styles from "./starslider.module.scss";
import { Text } from "@components/shop";

export function StarSlider({ max }: { max: number }) {
    const values = [0, 100, 200, 300, 400, 500]
    const [selected, setSelected] = useState(0)

    return (
        <Text className={styles.starslider}>
            <input
                type="range"
                min={0}
                max={values.length - 1}
                step={1}
                value={values.indexOf(selected)}
                onChange={e => setSelected(values[+e.target.value])}
                className={
                    [
                        styles.range,
                        selected > max ? styles.notenough : styles.enough
                    ].filter(Boolean).join(" ")
                }
            />
            <div className={styles.values}>
                {values.map(v => (
                    <p
                        key={v}
                        className={[
                            styles.value,
                            v === selected ? styles.selected : "",
                            v > max ? styles.notenough : styles.enough
                        ].filter(Boolean).join(" ")}
                    >
                        {v}
                    </p>
                ))}
            </div>
        </Text>
    )
}