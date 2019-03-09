import actions from "./actions";

const initState = {
    bookings: null,
};

export default function bookingReducer(state = initState, action) {
    switch (action.type) {
        case actions.FETCH_BOOKING_SUCESS:
            return {
                ...state,
                bookings: action.bookings
            };
        case actions.FETCH_BOOKING_ERROR:
            return {
                ...state,
                bookings: null
            };
        default:
            return state;
    }
}
