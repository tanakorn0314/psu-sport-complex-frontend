import actionTypes from './action-types';

export function storeToken(token) {
    return {
        type: actionTypes.STORE_TOKEN,
        payload: token
    };
}