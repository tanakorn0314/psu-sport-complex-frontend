const actions = {
    CHANGE_SIZE: 'CHANGE_SIZE',
    START_LOAD: 'START_LOAD',
    END_LOAD: 'END_LOAD',
    startLoad: () => (dispatch) => {
        dispatch({type: actions.START_LOAD})
    },
    endLoad: () => (dispatch) => {
        dispatch({type: actions.END_LOAD})
    },
    setMobileScreen: (isMobile) => async (dispatch) => {
        dispatch({type: actions.CHANGE_SIZE, isMobile})
    }
}

export default actions