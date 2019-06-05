import moment from 'moment';

function createConfirmBookingDTO(data) {
    const {
        minute,
        hour,
        date,
        month,
        year,
        account,
        deposit
    } = data;

    
    const timestamp = moment().minute(minute).hour(hour).date(date).month(month).year(year).format();

    return {
        account,
        deposit,
        date: timestamp
    }
}

export default {
    createConfirmBookingDTO
}