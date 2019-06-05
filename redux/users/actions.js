import UserService from '../../core/service/userService';


const actions = {
    FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
    fetchAllUsers: () => async (dispatch) => {
        const users = await UserService.getAll();
        dispatch({type: actions.FETCH_USERS_SUCCESS, users});
    },
    toMember: (userId, data) => async (dispatch, getState) => {
        const { idToken } = getState().Auth;
        const result = await UserService.toMember(idToken, userId, data);
        await dispatch(actions.fetchAllUsers());
        return result;
    }
}

export default actions;