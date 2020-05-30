export const formatter = (number: number): string => {
    return new Intl.NumberFormat('en', { minimumFractionDigits: 2 }).format(number)
}
