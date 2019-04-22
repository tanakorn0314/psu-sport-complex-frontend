import moment from 'moment';

function seperateDataByStartTime(bookingsData, selectedDate) {
    const seperatedData = {};

    bookingsData.forEach((booking) => {
        const bookDate = booking.startDate.slice(0, 10);

        if(!moment(selectedDate).isSame(bookDate,'date'))
            return;
        const startTime = booking.startDate.slice(11, 16);
        if (!seperatedData[startTime])
            seperatedData[startTime] = [];
        seperatedData[startTime][booking.courtId - 1] = booking;
    })

    return seperatedData;
}


export default {
    seperateDataByStartTime
}