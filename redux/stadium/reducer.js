import actions from "./actions";

const initState = {
    stadium: []
};

export default function bookingReducer(state = initState, action) {
    switch (action.type) {
        case actions.FETCH_STADIUM_SUCCESS:
            return {
                ...state,
                stadium: action.payload
            };
        default:
            return state;
    }
}
