export const Random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min)) + min;
}
export const NumberFormat = (num: number): string => {
    return num.toLocaleString();
}