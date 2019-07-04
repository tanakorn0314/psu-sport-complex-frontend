import BillService from '../../core/service/billService';
import helper from './helper';

const actions = {
  FETCH_BILL_SUCCESS: 'FETCH_BILL_SUCCESS',
  FETCH_MY_BILL_SUCCESS: 'FETCH_MY_BILL_SUCCESS',
  fetchMyBills: (token) => async (dispatch) => {
    const result = await BillService.getMyBills(token);
    dispatch({ type: actions.FETCH_MY_BILL_SUCCESS, payload: result });
    return result;
  },
  fetchBills: () => async (dispatch, getState) => {
    const result = await BillService.getBills();
    const { profile } = getState().Auth;
    const myBills = helper.extranctMyBills(profile.userId, result)

    dispatch({ type: actions.FETCH_BILL_SUCCESS, bills: result, myBills });
    return result;
  },
  confirm: (billId, data) => async (dispatch, getState) => {
    const accessToken = getState().Auth.idToken;
    const result = await BillService.confirm(accessToken, billId, data);
    return result;
  },
  approve: (billId) => async (dispatch, getState) => {
    const accessToken = getState().Auth.idToken;
    const result = await BillService.approve(accessToken, billId);
    return result;
  },
};
export default actions;
