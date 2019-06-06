import actions from './actions';

const initState = {
    lang: 'en'
};

export default function langReducer(state = initState, action) {
    switch (action.type) {
        case actions.SET_LANG:
            return {
                ...state,
                lang: action.lang
            };
        default:
            return state;
    }
}
