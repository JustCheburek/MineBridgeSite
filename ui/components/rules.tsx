import type {PropsWithChildren} from "react";
import styles from "./styles/rules.module.scss";
import {StarSvg} from "@ui/SVGS";
import {LinkNumber} from "@components/number";

type RulesBox = {
    name: string
    heading: string
    number: number
}

export const RulesBox = ({name, heading, number, children}: PropsWithChildren<RulesBox>) => {
    return (
        <section className={styles.container} id={name}>
            {/* Заголовок */}
            <div className={styles.heading}>
                {/* Цифра */}
                <LinkNumber href={name}>
                    {number}
                </LinkNumber>

                {/* Кнопка */}
                <h3 className={styles.heading_rules_text}>
                    {heading}
                </h3>
            </div>

            {/* Содержание */}
            <ul id={name + "_box"} className={`${styles.box} not_indent remove_marker`}>
                {/* Rule */}
                {children}
            </ul>
        </section>
    )
}

type Rule = {
    number: number
    text?: string
    stars?: number
}

export const Rule = ({number, children, stars, text}: PropsWithChildren<Rule>) => (
    <li className={styles.rule} id={number?.toString()}>
        {number &&
          <LinkNumber href={number.toString()} box={false}>
              {number}
          </LinkNumber>
        }

        <div className={styles.rule_text}>
            {children}
            {(stars || text) &&
              <Punishment stars={stars} text={text}/>
            }
        </div>
    </li>
)

export const Punishment = ({text, stars}: { text?: string; stars?: number }) => (
    <p className={styles.punishment}>
        {text}
        {(text && stars) && " / "}
        {stars && <>
            {"-"}{stars}<StarSvg height="0.75em"/>
        </>}
    </p>
)