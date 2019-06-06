import AdminAction from './actions';
import moment from 'moment';

const types = AdminAction;

const initialState = {
    start: moment(),
    end: moment().add(1, 'day'),
    userId: '',
    name: '',
    status: 'all',
    displayBookings: [],
    fee: 0,
    stadiumId: 0,
    csv: [],
}

export default function AdminReducer(state = initialState, action) {
    switch (action.type) {
        case types.FILTER_START:
            return {
                ...state,
                start: action.start,
            }
        case types.FILTER_END:
            return {
                ...state,
                end: action.end,
            }
        case types.FILTER_USER_ID:
            return {
                ...state,
                userId: action.userId,
            }
        case types.FILTER_NAME:
            return {
                ...state,
                name: action.name,
            }
        case types.FILTER_STATUS:
            return {
                ...state,
                status: action.status,
            }
        case types.FILTER_STADIUM:
            return {
                ...state,
                stadiumId: action.stadiumId,
            }
        case types.REFRESH_DATA:
            return {
                ...state,
                displayBookings: action.displayBookings,
                fee: action.fee,
                csv: action.csv
            }
        default:
            return state;
    }
}