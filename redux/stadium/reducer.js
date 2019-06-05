import actions from './actions';

const initState = {
    stadiums: []
};

export default function bookingReducer(state = initState, action) {
    switch (action.type) {
        case actions.FETCH_STADIUM_SUCCESS:
            return {
                ...state,
                stadiums: action.payload
            };
        default:
            return state;
    }
}
