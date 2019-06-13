import actions from "./actions";

const initState = {
    bills: [],
    myBills: []
};

export default function billReducer(state = initState, action) {
    switch (action.type) {
        case actions.FETCH__MY_BILL_SUCCESS:
            return {
                ...state,
                myBills: action.payload
            };
        case actions.FETCH_BILL_SUCCESS:
            return {
                ...state,
                bills: action.bills,
                myBills: action.myBills
            };
        default:
            return state;
    }
}
