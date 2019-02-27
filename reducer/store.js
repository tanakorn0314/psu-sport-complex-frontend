import actionTypes from '../action/action-types';
import { createStore } from 'redux';

const initialState = {
    user: {}
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.STORE_USER:
            return {
                ...state,
                user: action.payload
            };
        default: return state;
    }
}

const makeStore = (state = initialState) => {
    return createStore(reducer, state);
}

export default makeStore;