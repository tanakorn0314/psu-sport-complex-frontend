import UserService from '../../coreLayer/service/userService';

const types = {
    FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
}

const dispatcher = {
    fetchAllUsers: () => async (dispatch) => {
        const users = await UserService.getAll();
        dispatch({type: types.FETCH_USERS_SUCCESS, users});
    },
    toMember: (userId, data) => async (dispatch) => {
        const result = await UserService.toMember(userId, data);
        await dispatch(dispatcher.fetchAllUsers());
        return result;
    }
}

export default {
    types,
    dispatcher
}