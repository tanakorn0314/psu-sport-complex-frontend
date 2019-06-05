import actions from "./actions";

const initState = {
    myBills: []
};

export default function billReducer(state = initState, action) {
    switch (action.type) {
        case actions.FETCH_BILL_SUCCESS:
            return {
                ...state,
                myBills: action.payload
            };
        default:
            return state;
    }
}
