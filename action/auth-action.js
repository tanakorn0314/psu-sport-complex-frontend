import actionTypes from './action-types';
import jwtDecode from 'jwt-decode';

export function storeUser(token) {
    let user = {};
    try {
        user = jwtDecode(token);
    } catch (e) {}
    return {
        type: actionTypes.STORE_USER,
        payload: user
    };
}