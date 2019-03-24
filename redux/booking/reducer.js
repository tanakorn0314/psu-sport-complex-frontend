import actions from "./actions";

const initState = {
    bookings: {},
    myBookings: [],
    courtId: 0,
    courtBooking: [],
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
        case actions.SELECT_COURT:
            return {
                ...state,
                courtId: action.courtId,
                courtBooking: state.bookings[action.courtId + 1],
            };
        case actions.FETCH_BOOKING_ERROR:
            return initState;
        default:
            return state;
    }
}
