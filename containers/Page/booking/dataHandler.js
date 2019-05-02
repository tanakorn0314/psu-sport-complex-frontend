import initData from './initData';
import moment from 'moment';

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

function toBookManyDto(bookingList, userId, stadiumId, date) {
    const bookManyDTO = bookingList.map((booking) => {
        const { court, start } = booking;
        const [hour, minute] = start.split(':'); 

        const startDate = moment(date).hour(+hour).minute(+minute).second(0).millisecond(0);
        const endDate = moment(date).hour(+hour).minute(+minute + 30).second(0).millisecond(0);

        const bookingInfo = {
            title: '',
            description: '',
            userId,
            stadiumId,
            courtId: court + 1,
            startDate: startDate.toISOString(true).slice(0, 19)+'.000Z',
            endDate: endDate.toISOString(true).slice(0, 19)+'.000Z'
        }

        return bookingInfo;
    })

    return bookManyDTO;
}

export default {
    handleDateInfo,
    toBookManyDto
}