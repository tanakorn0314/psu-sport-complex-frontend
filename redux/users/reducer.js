import UsersActions from './actions';

const types = UsersActions;

const initialState = {
    users: []
}

export default function UsersReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
            }
        default:
            return state;
    }
}