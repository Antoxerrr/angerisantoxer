const LOCALE = 'Asia/Vladivostok'
const THAT_DATE = moment(new Date('2021-09-25T00:00:00.00'), LOCALE);
const now = () => moment(new Date(), LOCALE);
const diff = () => moment.duration(now().diff(THAT_DATE));

const dateElement = document.getElementById('date-str');
const timeElement = document.getElementById('time-str');

const zfill = (num, places) => String(num).padStart(places, '0');
const pluralize = (num, variants) => {
    if (variants.length !== 3) {
        throw Error('Pluralize variants must have 3 items.')
    }
    let lastDigit = num % 10;
    if (lastDigit === 1) {
        return variants[0]
    } else if ([2,3,4].includes(lastDigit)) {
        return variants[1]
    } else {
        return variants[2]
    }
};

class ViewDataHolder {
    constructor(dateStr, timeStr) {
        this.dateStr = dateStr;
        this.timeStr = timeStr;
    }
}

const getTimeStr = (diffObject) => {
    let s = zfill(diffObject.seconds(), 2);
    let m = zfill(diffObject.minutes(), 2);
    let h = zfill(diffObject.hours(), 2);
    return `${h}:${m}:${s}`;
}

const getDateStr = (diffObject) => {
    let values = [
        [diffObject.years(), ['год', 'года', 'лет']],
        [diffObject.months(), ['месяц', 'месяца', 'месяцев']],
        [diffObject.days(), ['день', 'дня', 'дней']]
    ];
    let result = [];
    values.forEach(v => {
        if (v[0]) {
            result.push(`${v[0]} ${pluralize(v[0], v[1])}`)
        }
    });
    return result.join(', ')
}

const tick = () => {
    let d = diff();
    timeElement.innerText = getTimeStr(d);
    dateElement.innerText = getDateStr(d);
}

tick();
setInterval(tick, 1000);