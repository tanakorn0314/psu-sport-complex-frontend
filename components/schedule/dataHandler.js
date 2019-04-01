const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Seb',
    'Oct',
    'Nov',
    'Dec'
];

const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];

const fullDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

function groupEventByDate(events) {
    const groupedEvent = {};
    if (events) {
        events.forEach((event) => {
            const dateIndex = event.startDate.slice(0, 10);
            if (!groupedEvent[dateIndex]) {
                groupedEvent[dateIndex] = []
            }
            groupedEvent[dateIndex].push(event);
            groupedEvent[dateIndex].sort((a, b) => (a.startDate - b.startDate));
        })
    }
    return groupedEvent;
}

function getnerateDateTitle(date) {
    const sunday = new Date(date.toISOString());
    sunday.setDate(sunday.getDate() - sunday.getDay());

    const saturday = new Date(sunday.toISOString());
    saturday.setDate(saturday.getDate() + 6);

    const sundayStr = sunday.toISOString();
    const saturdayStr = saturday.toISOString();

    const startMonth = months[+sundayStr.slice(5, 7) - 1];
    const startDay = +sundayStr.slice(8, 10);

    const endMonth = months[+saturdayStr.slice(5, 7) - 1];
    const endDay = +saturdayStr.slice(8, 10);

    let dateTitle = `${startMonth} ${startDay} - ${startMonth !== endMonth ? endMonth : ''} ${endDay}`;
    return {
        date: dateTitle,
        year: sunday.getFullYear()
    };
}


function generateWeekdays(date) {
    const sunday = new Date(date.toISOString());
    sunday.setDate(sunday.getDate() - sunday.getDay());
    let day = sunday;

    const weekDays = [];
    const dayStr = day.toISOString().slice(8, 10);
    //10 Sun
    weekDays.push(`${dayStr} ${days[0]}`);
    for (let i = 0; i < 6; i++) {
        day.setDate(day.getDate() + 1);
        const dayStr = day.toISOString().slice(8, 10);
        weekDays.push(`${dayStr} ${days[i + 1]}`);
    }

    return weekDays;
}

function generateFullWeekdays(date) {
    const sunday = new Date(date.toISOString());
    sunday.setDate(sunday.getDate() - sunday.getDay());
    let day = sunday;

    const weekDays = [];
    const dayStr = day.toISOString().slice(8, 10);
    //Sunday, 10 March 2019
    weekDays.push(`${fullDays[0]}, ${dayStr} ${months[day.getMonth()]} ${day.getFullYear()}`);
    for (let i = 0; i < 6; i++) {
        day.setDate(day.getDate() + 1);
        const dayStr = day.toISOString().slice(8, 10);
        weekDays.push(`${fullDays[i + 1]}, ${dayStr} ${months[day.getMonth()]} ${day.getFullYear()}`);
    }

    return weekDays;
}

function generateDateIndex(date) {
    const sunday = new Date(date.toISOString());
    sunday.setDate(sunday.getDate() - sunday.getDay());

    const day = sunday;

    const dateIndices = [];
    const index = day.toISOString().slice(0, 10);
    dateIndices.push(index);
    for (let i = 0; i < 6; i++) {
        day.setDate(day.getDate() + 1);
        const index = day.toISOString().slice(0, 10);
        dateIndices.push(index);
    }

    return dateIndices;
}

function toRangeStr(event) {
    let { startDate, endDate } = event;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const startTime = startDate.toISOString().slice(11, 16).replace(':', '.');
    const endTime = endDate.toISOString().slice(11, 16).replace(':', '.');
    return `${startTime} - ${endTime}`;
}

function filterEvents(date, eventGroups) {
    const dateIndices = generateDateIndex(date);
    const events = dateIndices.map(index => (eventGroups[index]) || []);
    return events;
}

function calculateSlot(event) {
    let { startDate, endDate } = event;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const startSlot = startDate.getHours() * 2 - (15 * 2) + (startDate.getMinutes() > 0 ? 1 : 0);
    const endSlot = endDate.getHours() * 2 - (15 * 2) + (endDate.getMinutes() > 0 ? 1 : 0);
    if (startSlot < 0 || endSlot > 13) {
        return {
            startSlot: -1,
            length: -1
        }
    }
    return {
        start: startSlot,
        length: endSlot - startSlot
    }
}

export {
    groupEventByDate,
    getnerateDateTitle,
    generateWeekdays,
    generateFullWeekdays,
    filterEvents,
    calculateSlot,
    toRangeStr
}