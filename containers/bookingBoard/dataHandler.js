import moment from 'moment';

function seperateDataByStartTime(bookingsData, selectedDate) {
    const seperatedData = {};

    bookingsData.forEach((booking) => {
        let start = moment(booking.startDate);
        let end = moment(booking.endDate);

        if (moment(selectedDate).isSame(start, 'date')) {
            do {
                const startTime = start.format('HH:mm');
                const b = {
                    ...booking,
                    startDate: start.format(),
                    endDate: start.clone().add(30, 'minute').format()
                };
                if (!seperatedData[startTime])
                    seperatedData[startTime] = [];
                seperatedData[startTime][booking.courtId - 1] = b;

                start.add(30, 'minute');
            } while (!(start.isSame(end, 'hour') && start.isSame(end, 'minute')))
        }

    });

    return seperatedData;
}

function generateTimeIndex(selectedDate, operationTimes) {
    const selectedDay = moment(selectedDate).locale('en').format('dddd').toLowerCase();
    const selectedOpTime = operationTimes[selectedDay];
    if (!selectedOpTime)
        return null;
    const start = moment(selectedOpTime.start, 'HH:mm');
    const end = moment(selectedOpTime.end, 'HH:mm');

    if (end.diff(start, 'hour') <= 0 && end.diff(start, 'hour') <= 0)
        return null;

    const indices = [];
    do {
        indices.push(start.format('HH:mm'));
        start.add(30, 'minute');
    } while (!(start.isSame(end, 'hour') && start.isSame(end, 'minute')));

    indices.push(start.format('HH:mm'));

    return indices;
}

function findBlackout(blackoutSeries, selectedDate) {
    return blackoutSeries.find((b) => moment(selectedDate).isBetween(moment(b.start), moment(b.end)));
}


export default {
    seperateDataByStartTime,
    generateTimeIndex,
    findBlackout
}