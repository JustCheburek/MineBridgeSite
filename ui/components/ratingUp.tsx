import Link from "next/link";

export function RatingUp() {
	return (
			<ul>
				<li>
					<Link href="/shop" className="unic_color medium-font">Купить рейтинг</Link>
				</li>
				<li>
					Выполнить задание админов
				</li>
				<li>
					Написать в{" "}
					<Link
							href="https://discord.gg/f95V9Rezqy"
							className="unic_color medium-font" target="_blank"
					>
						техподдержку
					</Link>
				</li>
			</ul>
	)
}