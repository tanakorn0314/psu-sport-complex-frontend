import actionTypes from './action-types';

export function createUser(user) {
    return {
        type: actionTypes.CREATE_USER,
        payload: user
    };
}