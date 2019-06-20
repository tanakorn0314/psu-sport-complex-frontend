import actions from "./actions";

const initState = {
	idToken: null,
	profile: null,
	authGuard: false
};

export default function authReducer(state = initState, action) {
	switch (action.type) {
		case actions.LOGIN_SUCCESS:
			return {
				...state,
				idToken: action.token,
				profile: action.profile
			};
		case actions.SET_AUTH_GUARD:
			return {
				...state,
				authGuard: action.authGuard
			};
		case actions.LOGOUT:
			return initState;
		default:
			return state;
	}
}
