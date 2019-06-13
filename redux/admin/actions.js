import moment from 'moment';
import bookingHelper from '../booking/helper';

const actions = {
    FILTER_STADIUM: 'FILTER_STADIUM',
    FILTER_START: 'FILTER_START',
    FILTER_END: 'FILTER_END',
    FILTER_USER_ID: 'FILTER_USER_ID',
    FILTER_NAME: 'FILTER_NAME',
    FILTER_STATUS: 'FILTER_STATUS',
    REFRESH_DATA: 'REFRESH_DATA',
    filterStart: (start) => (dispatch) => {
        dispatch({ type: actions.FILTER_START, start });
        dispatch(actions.refreshData());
    },
    filterEnd: (end) => (dispatch) => {
        dispatch({ type: actions.FILTER_END, end });
        dispatch(actions.refreshData());
    },
    filterUserId: (userId) => (dispatch) => {
        dispatch({ type: actions.FILTER_USER_ID, userId });
        dispatch(actions.refreshData());
    },
    filterName: (name) => (dispatch) => {
        dispatch({ type: actions.FILTER_NAME, name });
        dispatch(actions.refreshData());
    },
    filterStatus: (status) => (dispatch) => {
        dispatch({ type: actions.FILTER_STATUS, status });
        dispatch(actions.refreshData());
    },
    filterStadium: (stadiumId) => (dispatch) => {
        console.log('test', stadiumId);
        dispatch({ type: actions.FILTER_STADIUM, stadiumId });
        dispatch(actions.refreshData());
    },
    refreshData: () => async (dispatch, getState) => {
        const {
            start,
            end,
            userId,
            name,
            status,
            stadiumId
        } = await getState().Admin;
        const {
            bookings
        } = await getState().Booking;
        const {
            stadiums
        } = await getState().Stadium;

        const filteredBooking = [];
        let fee = 0;
        let csv = []

        Object.values(bookings).forEach((stadiumBookings) => {
            stadiumBookings.forEach((booking) => {
                const { startDate, endDate, ownerName, ownerInfo, ownerPosition } = booking;
                const stadium = stadiums[booking.stadiumId - 1];

                const checkStadiumId = stadiumId === 0 || stadiumId === booking.stadiumId;
                const inStartRange = moment(start).isSameOrBefore(startDate);
                const inEndRange = moment(end).isSameOrAfter(endDate);
                const startwithPhoneNo = userId.length === 0 || ownerInfo.startsWith(userId);
                const startWithName = name.length === 0 || ownerName.startsWith(name);
                const checkStatus = booking.status === 'approved';

                if (checkStadiumId && inStartRange && inEndRange && startwithPhoneNo && startWithName && checkStatus) {
                    filteredBooking.push(booking);
                    fee += bookingHelper.calculateBookingFee(ownerPosition, booking, stadium);
                }
            })
        })

        csv = createCSV(filteredBooking, stadiums)

        dispatch({ type: actions.REFRESH_DATA, displayBookings: filteredBooking, fee, csv })
    },
    callbackAdmin: () => (dispatch) => {
        dispatch(actions.refreshData());
    }
}

function createCSV(bookings, stadiums) {
    const csvData = [];
    csvData.push(['No', 'Name', 'PhoneNo / PSUPassport', 'Stadium', 'Play Date', 'time', 'Fee']);

    bookings.forEach((booking, index) => {
        const { ownerName, ownerInfo, startDate, endDate, stadiumId, courtId, fee } = booking;
        const stadium = stadiums[stadiumId - 1];

        const userId = ownerInfo;
        const playDate = moment(startDate).parseZone().format('MMMM DD, YYYY');
        const startTime = moment(startDate).parseZone().format('HH:mm');
        const endTime = moment(endDate).parseZone().format('HH:mm');

        csvData.push([
            index + 1,
            ownerName,
            userId,
            `${stadium.name} ${courtId}`,
            playDate,
            `${startTime} - ${endTime}`,
            fee
        ])
    })
    return csvData;
}

export default actions;