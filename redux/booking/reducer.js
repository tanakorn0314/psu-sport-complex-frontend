import actions from './actions';
import moment from 'moment';

const initState = {
    stadiumId: 1,
    bookings: {},
    stadiumBooking: [],
    selectedBooking: {},
    bookingList: [],
    fee: 0,
    selectedDate: moment(),
    bottomActionVisible: false,
    owner: {
        name: '',
        info: '',
        position: ''
    }
};

export default function bookingReducer(state = initState, action) {
    switch (action.type) {
        case actions.SET_BOOKINGS:
            return {
                ...state,
                bookings: action.bookings,
                stadiumBooking: state.bookings[state.stadiumId],
            };
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
        case actions.SELECT_DATE:
            return {
                ...state,
                selectedDate: action.selectedDate,
                selectedBooking: {},
                bookingList: [],
                fee: 0
            }
        case actions.SET_BOTTOM_ACTION_VISIBLE:
            return {
                ...state,
                bottomActionVisible: action.visible
            }
        case actions.SET_OWNER:
            return {
                ...state,
                owner: action.owner
            }
        case actions.SET_FEE:
            return {
                ...state,
                fee: action.fee
            }
        default:
            return state;
    }
}
