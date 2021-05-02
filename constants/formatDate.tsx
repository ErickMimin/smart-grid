const MONTHS = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

const MONTHS_ABR = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
];

export const formatDate = (date: Date) => {
    return `${date.getDay() < 10 ? '0' + date.getDay() : date.getDay() }-${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}-${date.getFullYear()}`
};

export const formatDateSubComplete = (date: Date) => {
    return `${MONTHS_ABR[date.getMonth()]} ${date.getDay()} a las ${date.getHours() > 12? date.getHours() - 12: date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getHours() > 12? 'PM': 'AM'}`
};