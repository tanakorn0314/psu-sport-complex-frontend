import UserService from '../../coreLayer/service/userService';


const actions = {
    FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
    fetchAllUsers: () => async (dispatch) => {
        const users = await UserService.getAll();
        dispatch({type: actions.FETCH_USERS_SUCCESS, users});
    },
    toMember: (userId, data) => async (dispatch) => {
        const result = await UserService.toMember(userId, data);
        await dispatch(actions.fetchAllUsers());
        return result;
    }
}

export default actions;