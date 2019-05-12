import _ from 'lodash';
import moment from 'moment';

const getSportIncome = (displayBookings, stadiums) => {
    const incomes = [];
    for (let idx in stadiums)
        incomes[idx] = 0;

    displayBookings.forEach((booking) => {
        const { stadiumId } = booking;
        incomes[stadiumId - 1] += booking.fee;
    });

    return incomes;
}

const getDailyIncome = (displayBookings, start, end) => {
    const diff = end.diff(start, 'day') + 1;

    const incomes = {};
    const idices = _.range(0, diff).map((num) => start.clone().add(num, 'day').format('DDMM'));
    idices.forEach((idx) => { incomes[idx] = 0;})

    displayBookings.forEach((booking) => {
        const bookDate = moment(booking.createdAt);
        incomes[bookDate.format('DDMM')] += booking.fee;
    });

    const result = idices.map((idx, i) => incomes[idx]);

    return result;
}

const getMonthlyIncome = (displayBookings, start, end) => {
    const diff = end.diff(start, 'month') + 1;

    const incomes = {};
    const idices = _.range(0, diff).map((num) => start.clone().add(num, 'month').format('MMYYYY'));
    idices.forEach((idx) => { incomes[idx] = 0;})

    displayBookings.forEach((booking) => {
        const bookDate = moment(booking.createdAt);
        incomes[bookDate.format('MMYYYY')] += booking.fee;
    });

    const result = idices.map((idx, i) => incomes[idx]);

    return result;
}

const getAnnualIncome = (displayBookings, start, end) => {
    const diff = end.diff(start, 'year') + 1;

    const incomes = {};
    const idices = _.range(0, diff).map((num) => start.clone().add(num, 'year').format('YYYY'));
    idices.forEach((idx) => { incomes[idx] = 0 })

    displayBookings.forEach((booking) => {
        const bookDate = moment(booking.createdAt);
        incomes[bookDate.year()] += booking.fee;
    });

    const result = idices.map((idx, i) => incomes[idx]);

    return result;
}

export default {
    getSportIncome,
    getDailyIncome,
    getMonthlyIncome,
    getAnnualIncome
}