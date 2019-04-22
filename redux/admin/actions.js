import moment from 'moment';

const types = {
    FILTER_STADIUM: 'FILTER_STADIUM',
    FILTER_START: 'FILTER_START',
    FILTER_END: 'FILTER_END',
    FILTER_PHONE_NO: 'FILTER_PHONE_NO',
    FILTER_NAME: 'FILTER_NAME',
    FILTER_STATUS: 'FILTER_STATUS',
    REFRESH_DATA: 'REFRESH_DATA'
}

const dispatcher = {
    filterStart: (start) => (dispatch) => {
        dispatch({type: types.FILTER_START, start});
        dispatch(dispatcher.refreshData());
    },
    filterEnd: (end) => (dispatch) => {
        dispatch({type: types.FILTER_END, end});
        dispatch(dispatcher.refreshData());
    },
    filterPhoneNumber: (phoneNumber) => (dispatch) => {
        dispatch({type: types.FILTER_PHONE_NO, phoneNumber});
        dispatch(dispatcher.refreshData());
    },
    filterName: (name) => (dispatch) => {
        dispatch({type: types.FILTER_NAME, name});
        dispatch(dispatcher.refreshData());
    },
    filterStatus: (status) => (dispatch) => {
        dispatch({type: types.FILTER_STATUS, status});
        dispatch(dispatcher.refreshData());
    },
    refreshData: () => async (dispatch, getState) => {
        const {
            start,
            end,
            phoneNumber,
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
                const checkStadiumId = stadiumId == booking.stadiumId;
                const inStartRange = moment(start).isSameOrBefore(booking.startDate);
                const inEndRange = moment(end).isSameOrAfter(booking.endDate);
                const startwithPhoneNo = phoneNumber.length === 0 || booking.owner.phoneNumber.startsWith(phoneNumber);
                const startWithName = name.length === 0 || booking.owner.fname.startsWith(name);
                const checkStatus = status === 'all' || booking.status === status;
                if (checkStadiumId && inStartRange && inEndRange && startwithPhoneNo && startWithName && checkStatus){
                    filteredBooking.push(booking);
                    fee += getBookingFee(stadiums[booking.stadiumId], booking.owner.position)
                }
             })
         })

         csv = createCSV(filteredBooking)

        dispatch({type: types.REFRESH_DATA, displayBookings: filteredBooking, fee, csv})
    }
}

function getBookingFee(stadium, userPosition) {
    switch(userPosition) {
        case 'member' :
            return stadium.costMember;
        case 'student' :
            return stadium.costStudent;
        case 'staff' :
            return stadium.costStaff;
        case 'admin' :
            return 0;
        default:
            return stadium.costPublic;
    }
}

function createCSV(bookings) {
    const csvData = [];
    csvData.push(['No', 'Name', 'PhoneNo', 'CourtId', 'start', 'end', 'status']);

    bookings.forEach((booking, index) => {
        csvData.push([
            index,
            booking.owner.fname,
            booking.owner.phoneNumber,
            booking.courtId,
            booking.startDate,
            booking.endDate,
            booking.status
        ])
    })
    return csvData;
}

export default {
    types,
    dispatcher
}