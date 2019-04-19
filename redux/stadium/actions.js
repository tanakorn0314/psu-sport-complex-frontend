import StadiumService from '../../coreLayer/service/stadiumService';

const actions = {
  FETCH_STADIUM_SUCCESS: 'FETCH_STADIUM_SUCCESS',
  fetchStadium: () => async (dispatch) => {
    const result = await StadiumService.getAll();
    dispatch({type: actions.FETCH_STADIUM_SUCCESS, payload: result});
    return result;
  }
};
export default actions;
