import initData from './initData';

const { durations } = initData;

function handleDateInfo(date, start, durationIndex) {
    const [inputHour, inputMinute] = start.split('.');

    const startTime = new Date(date);
    startTime.setHours(+inputHour, +inputMinute, 0, 0, 0);

    const finishTime = new Date(date);
    finishTime.setHours(
        durations[durationIndex][1] + parseInt(inputHour),
        durations[durationIndex][2] + parseInt(inputMinute),
        0,
        0,
        0
    );

    return {
        startDate: startTime.toISOString(),
        endDate: finishTime.toISOString()
    }
}

export default {
    handleDateInfo
}