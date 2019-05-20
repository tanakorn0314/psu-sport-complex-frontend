import moment from 'moment';
import bookingHelper from '../booking/helper';

const types = {
    FILTER_STADIUM: 'FILTER_STADIUM',
    FILTER_START: 'FILTER_START',
    FILTER_END: 'FILTER_END',
    FILTER_USER_ID: 'FILTER_USER_ID',
    FILTER_NAME: 'FILTER_NAME',
    FILTER_STATUS: 'FILTER_STATUS',
    REFRESH_DATA: 'REFRESH_DATA'
}

const dispatcher = {
    filterStart: (start) => (dispatch) => {
        dispatch({ type: types.FILTER_START, start });
        dispatch(dispatcher.refreshData());
    },
    filterEnd: (end) => (dispatch) => {
        dispatch({ type: types.FILTER_END, end });
        dispatch(dispatcher.refreshData());
    },
    filterUserId: (userId) => (dispatch) => {
        dispatch({ type: types.FILTER_USER_ID, userId });
        dispatch(dispatcher.refreshData());
    },
    filterName: (name) => (dispatch) => {
        dispatch({ type: types.FILTER_NAME, name });
        dispatch(dispatcher.refreshData());
    },
    filterStatus: (status) => (dispatch) => {
        dispatch({ type: types.FILTER_STATUS, status });
        dispatch(dispatcher.refreshData());
    },
    refreshData: () => async (dispatch, getState) => {
        const {
            start,
            end,
            userId,
            name,
            status,
        } = await getState().Admin;
        const {
            bookings,
            stadiumId
        } = await getState().Booking;
        const {
            stadiums
        } = await getState().Stadium;

        const filteredBooking = [];
        let fee = 0;
        let csv = []

        Object.values(bookings).forEach((stadiumBookings) => {
            stadiumBookings.forEach((booking) => {
                const { startDate, endDate, owner } = booking;
                const { phoneNumber, psuPassport, fname, position } = owner;
                const stadium = stadiums[booking.stadiumId - 1];

                const checkStadiumId = stadiumId === 0 || stadiumId === booking.stadiumId;
                const inStartRange = moment(start).isSameOrBefore(startDate);
                const inEndRange = moment(end).isSameOrAfter(endDate);
                const startwithPhoneNo = userId.length === 0 || phoneNumber.startsWith(userId) || psuPassport.startsWith(userId);
                const startWithName = name.length === 0 || fname.startsWith(name);
                const checkStatus = status === 'all' || status === booking.status;

                if (checkStadiumId && inStartRange && inEndRange && startwithPhoneNo && startWithName && checkStatus) {
                    filteredBooking.push(booking);
                    fee += bookingHelper.calculateBookingFee(position, booking, stadium);
                }
            })
        })

        csv = createCSV(filteredBooking, stadiums)

        dispatch({ type: types.REFRESH_DATA, displayBookings: filteredBooking, fee, csv })
    }
}

function createCSV(bookings, stadiums) {
    const csvData = [];
    csvData.push(['No', 'Name', 'PhoneNo / PSUPassport', 'Stadium', 'Play Date', 'time', 'Fee']);

    bookings.forEach((booking, index) => {
        const { owner, startDate, endDate, stadiumId, courtId, fee } = booking;
        const { fname, lname, phoneNumber, psuPassport } = owner;
        const stadium = stadiums[stadiumId - 1];

        const userId = phoneNumber.length > 0 ? phoneNumber : psuPassport;
        const playDate = moment(startDate).parseZone().format('MMMM DD, YYYY');
        const startTime = moment(startDate).parseZone().format('HH:mm');
        const endTime = moment(endDate).parseZone().format('HH:mm');

        csvData.push([
            index + 1,
            `${fname} ${lname}`,
            userId,
            `${stadium.name} ${courtId}`,
            playDate,
            `${startTime} - ${endTime}`,
            fee
        ])
    })
    return csvData;
}

export default {
    types,
    dispatcher
}