export function timeBetweenDatesText(date1, date2 = new Date()) {
    let time = (date2 - date1);
    const DAY_FACTOR = (1000 * 60 * 60 * 24);
    const HOUR_FACTOR = (1000 * 60 * 60);
    const MINUTE_FACTOR = (1000 * 60);
    let days = Math.round(time / DAY_FACTOR);
    let hours = Math.round(time / HOUR_FACTOR);
    let minutes = Math.round(time / MINUTE_FACTOR);
    let duration_text = "";

    if (days !== 0)
        duration_text = days + " days";
    else if (hours !== 0)
        duration_text = hours + " hours";
    else
        duration_text = minutes + " minutes";

    return duration_text;
}