import moment from 'moment';

function createConfirmDataSource(fee, billId, createdAt) {
    return {
        fee,
        billId,
        startCount: {
            minute: ((19 - moment().diff(moment(createdAt), 'minute')) % 20),
            second: ((59 - moment().diff(moment(createdAt), 'second')) % 60)
        }
    }
}

function toBookingDTO(bookingList, userId, owner, stadiumId, date) {
    const bookByAdminDTO = bookingList.map((booking) => {
        const { court, start, end } = booking;

        const startDate = convertDate(date, start);
        const endDate = convertDate(date, end);

        const bookingInfo = {
            title: '',
            description: '',
            userId,
            ownerName: owner.name,
            ownerInfo: owner.info,
            ownerPosition: owner.position,
            stadiumId,
            courtId: court + 1,
            startDate,
            endDate
        }

        return bookingInfo;
    })

    return bookByAdminDTO;
}

function convertDate(date, time) {
    const [hour, minute] = time.split(':');
    return moment(date).hour(+hour).minute(+minute).second(0).millisecond(0).format();
}

export default {
    toBookingDTO,
    createConfirmDataSource
}