import actions from "./actions";

const initState = {
    operationTimes: [],
    blackoutSeries: []
};

export default function operationTimesReducer(state = initState, action) {
    switch (action.type) {
        case actions.UPDATE_OPERATION_TIME:
            return {
                ...state,
                operationTimes: action.payload
            };
        case actions.UPDATE_BLACKOUT:
            return {
                ...state,
                blackoutSeries: action.payload
            }
        default:
            return state;
    }
}
