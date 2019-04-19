const types = {
    CHANGE_SIZE: 'CHANGE_SIZE',
    START_LOAD: 'START_LOAD',
    END_LOAD: 'END_LOAD',
}

const dispatcher = {
    startLoad: () => (dispatch) => {
        dispatch({type: types.START_LOAD})
    },
    endLoad: () => (dispatch) => {
        dispatch({type: types.END_LOAD})
    },
    setMobileScreen: (isMobile) => async (dispatch) => {
        dispatch({type: types.CHANGE_SIZE, isMobile})
    }
}

export default {
    types,
    dispatcher
}