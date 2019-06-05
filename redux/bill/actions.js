import BillService from '../../core/service/billService';

const actions = {
  FETCH_BILL_SUCCESS: 'FETCH_BILL_SUCCESS',
  fetchMyBills: (token) => async (dispatch) => {
    const result = await BillService.getMyBills(token);
    dispatch({type: actions.FETCH_BILL_SUCCESS, payload: result});
    return result;
  }
};
export default actions;
