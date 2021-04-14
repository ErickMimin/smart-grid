export const formatDate = (date: Date) => {
    return `${date.getDay() < 10 ? '0' + date.getDay() : date.getDay() }-${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}-${date.getFullYear()}`
};