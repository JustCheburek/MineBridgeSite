import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Chance, Drop, RarityCost, RarityType } from '@/types/case'

/**
 * Объединяет классы с поддержкой групп вариантов
 *
 * Позволяет использовать синтаксис вида: hover:(bg-blue-500 text-white)
 * Который преобразуется в: hover:bg-blue-500 hover:text-white
 *
 * Использование:
 * import { cn } from '@/lib/utils';
 *
 * <div className={cn('flex', isActive && 'hover:(bg-blue-500 text-white)')}>
 *   ...
 * </div>
 *
 * @param inputs Классы для объединения
 * @returns Объединенная и обработанная строка классов
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Красный < 0 < Зелёный
 */
export function ColorText(number: number, need: number = 0, zero: 'white' | 'green' = 'white') {
  if (number > need) return 'text-green'
  if (number < need) return 'text-red'
  return zero === 'white' ? 'text-white' : 'text-green'
}

/**
 * Даёт сумму шансов
 */
export function SumChances<T extends Chance>(array: T[]): number {
  return array.reduce((sum, { chance }) => sum + chance, 0)
}

/**
 * Генерирует случайное целое от 0 до maxNumber‑1,
 * в идеале через Web Crypto API везде, где он есть.
 */
export const Random = (maxNumber: number): number => {
  // Универсальный крипто‑объект
  const cryptoObj =
    typeof globalThis !== 'undefined' && 'crypto' in globalThis
      ? (globalThis.crypto as Crypto)
      : null

  if (cryptoObj?.getRandomValues) {
    const array = new Uint32Array(1)
    cryptoObj.getRandomValues(array)
    return array[0] % maxNumber
  }

  // Фоллбэк для совсем старых окружений
  return Math.floor(Math.random() * maxNumber)
}

/**
 * Возвращает стоимость проходки с учётом скидки
 */
export function GetMostiki(months: number, selected: number) {
  // 100 -> 0.9
  // 200 -> 0.8
  // 300 -> 0.7
  // 400 -> 0.6
  // 500 -> 0.5
  const reverse = 1 - selected / 1000
  const price = (months * 90 + 10) * reverse
  // Округление до ближайщего 5 или 10
  const rounded = Math.round(price / 5) * 5
  return rounded
}

/**
 * Возвращает стоимость проходки без учёта скидки
 */
export function GetOriginalMostiki(months: number) {
  return months * 100
}

/**
 * Получить стоимость дропа
 */
export function GetDropCost(DropItem: Drop, rarity: RarityType) {
  return DropItem.price * 2 + RarityCost[rarity]
}