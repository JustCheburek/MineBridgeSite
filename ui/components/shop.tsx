"use client";

// React
import type {PropsWithChildren} from "react";
import {useState} from "react";
import Link from "next/link";

// Типы
import {Case, DropNames, RarityNames} from "@/types/case";

// Стили
import styles from "./styles/shop.module.scss"

// Компоненты
import {Url} from "@components/button";
import {Modal} from "@components/modal";
import {MostikiSvg} from "@ui/SVGS";
import {Img, ImgBox} from "@components/img";
import {SumChances} from "@app/utils";
import {H1} from "@components/h1";

export const Section = ({children, name}: PropsWithChildren<{ name: string }>) => (
    <div className={`${styles.container} center_text ${styles[name]}`}>
        {children}
    </div>
)

type Heading = {
    id: string;
    heading: string;
    href?: string;
}

export const Heading = ({children, heading, href, id}: PropsWithChildren<Heading>) => (
    <div className={`${styles.section_heading} center_text`} id={id}>
        <h2>
            {href
                ? <Link href={href}>
                    {heading}
                </Link>
                : heading
            }
        </h2>

        {children &&
          <div>
              {children}
          </div>
        }
    </div>
)

type Author = {
    description: string;
    href: string;
}

export const Author = ({description, href, children}: PropsWithChildren<Author>) => (
    <div className={`${styles.author_heading} center_text`}>
        <Link href={href} target="_blank">
            <h3>
                {children}
            </h3>
            <small>
                {description}
            </small>
        </Link>
    </div>
)

export const Box = ({children, preview = false, ...props}: PropsWithChildren<{ preview?: boolean }>) => (
    <div className={`${styles.box} ${preview ? styles.preview : ""}`} {...props}>
        {children}
    </div>
)

export const Text = ({children}: PropsWithChildren) => (
    <div className={styles.text}>
        {children}
    </div>
)

export const Price = ({children, oldPrice}: PropsWithChildren<{ oldPrice?: number }>) => (
    <div className={styles.price}>
        {oldPrice &&
          <p className={`${styles.old_price} medium-font`}>
              {oldPrice}
          </p>
        }

        <h2 className={styles.price_text}>{children}</h2>

        <h3 className={styles.price_type}>
            <MostikiSvg/>
        </h3>
    </div>
)

export const CaseInfo = ({children, description}: PropsWithChildren<{ description?: string }>) => (<>
    <h3>{children}</h3>
    {description &&
      <small className={styles.description}>
          {description}
      </small>
    }
</>)

export const StickerButton = () => (
    <Url href="https://t.me/MineBridgeOfficial/326" margin="10px">
        Купить
    </Url>
)

export function CaseBox({Case, size = 185, helper = true, isModal = true, children}: PropsWithChildren<{
    Case: Case
    size?: number
    helper?: boolean
    isModal?: boolean
}>) {
    const chancesRarity = SumChances(Case.rarity)
    const chancesDrop = SumChances(Case.drop)
    const [modal, setModal] = useState(false)

    return (<>
        <ImgBox className={styles[Case.name]} helper={helper} onClick={() => isModal && setModal(true)} hover overflow={false}>
            <Img
                src={`/shop/${Case.name}.png`} alt={`${Case.displayname} кейс`}
                width={size}
            />
            {children}
        </ImgBox>
        {isModal &&
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
                      const translate = DropNames[drop.name]

                      return (
                          <p key={drop.name}>
                              {translate} - {Math.round(drop.chance / chancesDrop * 1000) / 10}%
                          </p>
                      )
                  })}
              </div>
            </div>
          </Modal>
        }
    </>)
}
