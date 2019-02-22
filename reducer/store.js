import actionTypes from '../action/action-types';
import { createStore } from 'redux';

const initialState = {};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CREATE_USER:
            return {
                ...state,
                user: action.payload
            };
        case actionTypes.STORE_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        default: return state;
    }
}

const makeStore = (state = initialState) => {
    return createStore(reducer, state);
}

export default makeStore;