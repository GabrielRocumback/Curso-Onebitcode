import dayjs from "dayjs";

export function nextAnniversaryDate(date) {
    let today = dayjs();
    let diff = (today.diff(date, 'year') == 0 ) ? today.diff(date, 'year') : today.diff(date, 'year') + 1
    return dayjs(date).add(diff, 'year').format('DD/MM/YYYY');
}

export function daysForBirthday(date) {
    let today = dayjs();
    let diff = (today.diff(date, 'year') == 0 ) ? today.diff(date, 'year') : today.diff(date, 'year') + 1
    let days = dayjs(date).add(diff, 'year').diff(today, 'day') + 1;
    return days;
}