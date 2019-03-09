import actions from "./actions";

const initState = {
	idToken: null,
	profile: null
};

export default function authReducer(state = initState, action) {
	switch (action.type) {
		case actions.LOGIN_SUCCESS:
			return {
				...state,
				idToken: action.token,
				profile: action.profile
			};
		case actions.LOGOUT:
			return initState;
		default:
			return state;
	}
}
