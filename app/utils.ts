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
 * Генерирует случайное целое от 0 до maxNumber‑1,
 * в идеале через Web Crypto API везде, где он есть.
 */
export const Random = (maxNumber: number): number => {
	// Универсальный крипто‑объект
	const cryptoObj =
		typeof globalThis !== "undefined" && "crypto" in globalThis
			? (globalThis.crypto as Crypto)
			: null;

	if (cryptoObj?.getRandomValues) {
		const array = new Uint32Array(1);
		cryptoObj.getRandomValues(array);
		return array[0] % maxNumber;
	}

	// Фоллбэк для совсем старых окружений
	return Math.floor(Math.random() * maxNumber);
};