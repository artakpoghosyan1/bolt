export const formatter = (number: number | string): string | null => {
    return number ?
        new Intl.NumberFormat('en', {minimumFractionDigits: 2})
            .format(parseFloat(`${number}`))
        : null
}
