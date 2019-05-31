import actions from "./actions";

const initState = {
    visible: false,
    title: '',
    body: '',
    footer: '',
    action: () => {},
    cancel: () => {},
    toggle: () => {},
    actionText: '',
    cancelText: '',
};

export default function modalReducer(state = initState, action) {
    switch (action.type) {
        case actions.SHOW_MODAL: 
            return {
                ...state,
                ...action.modal,
                visible: true
            }
        case actions.HIDE_MODAL:
            return {
                ...state,
                visible: false
            }
        case actions.TOGGLE_MODAL:
            return {
                ...state,
                visible: !state.visible
            }
        default:
            return state;
    }
}
