import styles from "@app/shop/(layout)/shop.module.scss";
import {SubsectionItem, Subsections} from "@components/sideNav";
import {MaxSize} from "@components/maxSize";
import {PropsWithChildren} from "react";

export default function Shop({children}: PropsWithChildren) {
	return (
			<div className={styles.shop}>
				<MaxSize sideNav>
					<Subsections menu="Меню правил">
						<SubsectionItem href="/shop">
							Магазин
						</SubsectionItem>
						<SubsectionItem href="/shop/buy">
							Покупка
						</SubsectionItem>
						<SubsectionItem href="/shop/case">
							Кейсы
						</SubsectionItem>
					</Subsections>

					{children}
				</MaxSize>
			</div>
	)
}