import moment from 'moment';

function toBookManyDto(bookingList, userId, stadiumId, date) {
    const bookManyDTO = bookingList.map((booking) => {
        const { court, start, end } = booking;
        const [sHour, sMinute] = start.split(':'); 
        const [eHour, eMinute] = end.split(':');

        const startDate = moment(date).hour(+sHour).minute(+sMinute).second(0).millisecond(0).format();
        const endDate = moment(date).hour(+eHour).minute(+eMinute).second(0).millisecond(0).format();

        const bookingInfo = {
            title: '',
            description: '',
            userId,
            stadiumId,
            courtId: court + 1,
            startDate,
            endDate
        }

        return bookingInfo;
    })

    return bookManyDTO;
}

export default {
    toBookManyDto
}