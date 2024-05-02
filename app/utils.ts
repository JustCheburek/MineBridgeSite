import {Chance} from "@/types/case";

/**
 * Красный < 0 < Зелёный
 */
export function ColorText(number: number) {
	if (number > 0) return "green_color"
	if (number < 0) return "red_color"
	return ""
}

/**
 * Даёт сумму шансов
 */
export function SumChances<T extends Chance>(
		array: T[]
): number {
	return array.reduce((sum, {chance}) =>
			sum + chance, 0
	)
}

/**
 * Генерирует случайное число в диапазоне от 0 до указанного max_number.
 */
export const Random = (maxNumber: number) => (
		Math.floor(Math.random() * maxNumber)
)

/**
 * Достаёт рандомный value из списка
 */
export function RandomValue<T extends Chance>(
		array: T[],
		sumChances: number
): T {
	if (array.length <= 1) {
		return array[0]
	}

	const randomChance = Random(sumChances || array.length)

	let id = 0;

	// Пока шанс не будет равен random_chance
	for (
			let chance = array[0].chance;
			chance <= randomChance;
			chance += array[id]?.chance | 1
	) {
		// Прибавляем айди
		id++;
	}

	return array[id]
}