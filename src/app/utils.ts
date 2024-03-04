export function colorText(number) {
    /**
     * Зелёный +
     * Красный -
     * Дефолтный цвет (белый) +-
     */
    if (number > 0) return "green_color"
    if (number < 0) return "red_color"
    return ""
}

export const getSumChances = (array) => (
    /**
     * Функция выдаёт сумму шансов
     * @param {array: [{chance: number}]} array - массив
     * @return {number}
     */
    array.reduce((sum, {chance}) =>
        sum + chance, 0
    )
)