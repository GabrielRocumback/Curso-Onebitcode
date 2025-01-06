import dayjs from "dayjs";

export function age(date) {
    let today = dayjs();
    date = dayjs(date);
    return today.diff(date, 'year');
}