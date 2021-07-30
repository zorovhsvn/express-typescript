export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
export const timenow = (): number => {
    return Date.now();
}
export const random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min)) + min;
}
export default {
    sleep,
    timenow,
    random
}