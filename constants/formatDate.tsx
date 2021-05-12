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

const DAY = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
]

export const formatMonth = (date: Date) => {
    return `${MONTHS[date.getMonth()]} de ${date.getFullYear()}`;
}

export const formatDate = (date: Date) => {
    return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate() }-${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getFullYear()}`
};

export const formatDateWithDay = (date: Date) => {
    return `${DAY[date.getDay()]}, ${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()} de ${MONTHS[date.getMonth()]} del ${date.getFullYear()}`
};

export const formatDateSubComplete = (date: Date) => {
    return `${MONTHS_ABR[date.getMonth()]} ${date.getDate()} a las ${date.getHours() > 12? date.getHours() - 12: date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getHours() > 12? 'PM': 'AM'}`
};