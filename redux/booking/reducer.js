import actions from "./actions";

const initState = {
    stadiumId: 1,
    bookings: {},
    myBookings: [],
    stadiumBooking: [],
    selectedBooking: {},
    bookingList: [],
    fee: 0
};

export default function bookingReducer(state = initState, action) {
    switch (action.type) {
        case actions.FETCH_BOOKING_SUCESS:
            return {
                ...state,
                bookings: action.bookings
            };
        case actions.BOOKING_SUCCESS:
            return {
                ...state,
                bookings: action.bookings
            };
        case actions.FETCH_MY_BOOKING_SUCCESS:
            return {
                ...state,
                myBookings: action.bookings
            }
        case actions.SELECT_STADIUM:
            return {
                ...state,
                stadiumId: action.stadiumId,
                stadiumBooking: state.bookings[action.stadiumId],
                selectedBooking: {},
                bookingList: [],
                fee: 0
            };
        case actions.SELECT_BOOKING:
            return {
                ...state,
                selectedBooking: action.selectedBooking,
                bookingList: action.bookingList,
                fee: action.fee
            }
        case actions.FETCH_BOOKING_ERROR:
            return initState;
        default:
            return state;
    }
}
