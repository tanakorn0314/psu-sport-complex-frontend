import actions from './actions';

const initState = {
    newsList: []
};

export default function newsReducer(state = initState, action) {
    switch (action.type) {
        case actions.FETCH_NEWS_SUCCESS:
            return {
                ...state,
                newsList: [...state.newsList, ...action.payload]
            };
        case actions.CREATE_NEWS:
            return {
                ...state,
                newsList: [action.payload, ...state.newsList]
            }
        case actions.UPDATE_NEWS:
            return {
                ...state,
                newsList: action.payload
            }
        case actions.DELETE_NEWS:
            return {
                ...state,
                newsList: action.payload
            }
        default:
            return state;
    }
}
