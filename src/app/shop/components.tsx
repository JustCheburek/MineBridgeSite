"use client";

// React
import type {PropsWithChildren} from "react";
import {useState} from "react";
import Link from "next/link";

// Типы
import {Case, DropNames, RarityNames} from "@src/types/case";

// Стили
import styles from "./shop.module.scss"

// Компоненты
import {NavButton} from "@components/button";
import {Modal} from "@components/modal";
import {MostikiSvg} from "@ui/svgs";
import {Img, ImgBox} from "@components/img";
import {SumChances} from "@app/utils";

export const Section = ({children, name}: PropsWithChildren<{ name: string }>) => (
		<div className={`${styles.container} center_text ${name}`}>
			{children}
		</div>
)

type Heading = {
	name: string;
	heading: string;
	href?: string;
}

export const Heading = ({children, heading, href, name}: PropsWithChildren<Heading>) => (
		<div className={`${styles.section_heading} center_text`} id={name}>
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
			<a href={href} target="_blank" rel="noreferrer noopener">
				<h3>
					{children}
				</h3>
				<small>
					{description}
				</small>
			</a>
		</div>
)

export const Box = ({children, className = "", ...props}: PropsWithChildren<{ className?: string; }>) => (
		<div className={`${styles.box} ${className}`} {...props}>
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

export const CaseButton = () => (
		<NavButton href="/shop/case" margin="10px">
			Купить
		</NavButton>
)

export const StickerButton = () => (
		<NavButton href="" margin="10px">
			Купить
		</NavButton>
)

export function CaseBox({caseType}: { caseType: Case }) {
	const chancesRarity = SumChances(caseType.rarity)
	const chancesDrop = SumChances(caseType.drop)
	const [modal, setModal] = useState(false)

	return (
			<>
				<ImgBox className={`${styles.pointer} ${styles.helper}`} onClick={() => setModal(true)} hover>
					<Img
							src={`/shop/${caseType.name}.png`} alt={`${caseType.displayname} кейс`}
							width={185}
					/>
				</ImgBox>
				<Modal modal={modal} setModal={setModal}>
					<h1>{caseType.displayname}</h1>
					<div className={styles.case_info}>
						<div className={styles.rarity}>
							<h2 className="unic_color">
								Редкости
							</h2>
							{caseType.rarity.map(rarity => {
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
							{caseType.drop.map(drop => {
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
			</>
	)
}
