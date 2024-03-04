import {Button, NavButton} from "@components/button";
import {useCreateUserPurchase, useMe} from "../../../hooks/userQueries";
import {RarityTranslate, TypeTranslate} from "./db";

export function RollButton(
		{
			isRolling,
			isWin,
			setIsWin,
			rollSettings,
			caseSettings,
			setSelectedItem,
			update,
			items,
			result,
			getRandomNumber,
			setIsRolling,
			price
		}) {
	const {data, isLoading, isError} = useMe()
	const createPurchase = useCreateUserPurchase(data?.user?.name)

	// Загрузка
	if (isLoading) {
		return (
				<Button disabled>
					Загрузка
				</Button>
		)
	}

	// Нет регистрации
	if (isError) {
		return (
				<NavButton href="/auth">
					Войти
				</NavButton>
		)
	}

	const {user} = data

	function roll() {
		if (isWin) {
			setIsWin(false)
			update()
		} else {
			const {rarity, type} = caseSettings.current

			createPurchase.mutate({
					caseType: {
						name: type,
						displayname: TypeTranslate[type]
					},
					caseRarity: {
						name: rarity,
						displayname: RarityTranslate[rarity]
					},
					price,
					resultType: {
						name: items[result].type.name,
						displayname: items[result].type.displayname
					},
					resultRarity: {
						name: items[result].rarity.name,
						displayname: items[result].rarity.displayname
					},
					resultDrop: {
						name: items[result].drop.name,
						displayname: items[result].drop.displayname
					}
			})

			// Настройки прокрутки
			rollSettings.current.rollWidth = 16050 + getRandomNumber(200)

			// Выигрыш
			setTimeout(() => {
				setIsWin(true)
				setSelectedItem(result)
			}, rollSettings.current.timeRoll + 500)
		}

		// Начинается прокрутка кейса
		setIsRolling(prev => !prev)
	}

	// Проверка прокрутки
	if (isRolling) {
		return (
				<Button
						onClick={roll}
						disabled={!isWin}
				>
					{createPurchase.isError
							? "Ошибка"
							: "Заново"}
				</Button>
		)
	}

	// Недостаточно баланса
	if (price > user.mostiki) {
		return (
				<Button disabled>
					Баланс
				</Button>
		)
	}

	// Всё успешно
	return (
			<Button
					onClick={roll}
			>
				Купить
			</Button>
	)
}