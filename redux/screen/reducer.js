import ScreenAction from './actions';

const types = ScreenAction;

const initialState = {
    isLoading: true,
    isMobile: false
}

export default function ScreenReducer(state = initialState, action) {
    switch(action.type) {
        case types.START_LOAD:
            return {
                ...state,
                isLoading: true
            }
        case types.END_LOAD:
            return {
                ...state,
                isLoading: false
            }
        case types.CHANGE_SIZE:
            return {
                ...state,
                isMobile: action.isMobile
            }
        default: 
            return state;
    }
}