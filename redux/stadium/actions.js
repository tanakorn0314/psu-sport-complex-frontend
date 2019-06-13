import StadiumService from '../../core/service/stadiumService';
import helper from './helper';

const actions = {
  FETCH_STADIUM_SUCCESS: 'FETCH_STADIUM_SUCCESS',
  CREATE_STADIUM: 'CREATE_STADIUM',
  UPDATE_STADIUM: 'UPDATE_STADIUM',
  DELETE_STADIUM: 'DELETE_STADIUM',
  fetchStadium: () => async (dispatch) => {
    const result = await StadiumService.getAll();
    dispatch({type: actions.FETCH_STADIUM_SUCCESS, payload: result});
    return result;
  },
  createStadium: (dto) => async (dispatch, getState) => {
    const { idToken } = getState().Auth;
    const result = await StadiumService.createStadium(idToken, dto);
    dispatch({type: actions.CREATE_STADIUM, payload: result});
    return result;
  },
  updateStadium: (id, dto) => async (dispatch, getState) => {
    const { idToken } = getState().Auth;
    let { stadiums } = getState().Stadium;
    const result = await StadiumService.updateStadium(idToken, id, dto);
    const updated = helper.updateStadium(stadiums, id, dto);
    dispatch({type: actions.UPDATE_STADIUM, payload: updated});
    return result;
  },
  deleteStadium: (id) => async (dispatch, getState) => {
    const { idToken } = getState().Auth;
    let { stadiums } = getState().Stadium;
    const result = await StadiumService.deleteStadium(idToken, id);
    const deleted = helper.deleteStadium(stadiums, id);
    dispatch({type: actions.DELETE_STADIUM, payload: deleted});
    return result;
  }
};
export default actions;
