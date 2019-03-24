import actions from "./actions";

const initState = {
    courtId: 0,
    courtBooking: []
};

export default function bookingInputReducer(state = initState, {type, courtId, bookings}) {
    switch (type) {
        case actions.SELECT_COURT:
            return {
                ...state,
                courtId,
                courtBooking: bookings,
            };
        default:
            return state;
    }
}
