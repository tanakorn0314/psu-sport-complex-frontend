import operationTimeService from '../../core/service/operationTimeService';
import moment from 'moment';

const actions = {
  UPDATE_OPERATION_TIME: 'UPDATE_OPERATION_TIME',
  UPDATE_BLACKOUT: 'UPDATE_BLACKOUT',
  getOperationTime: () => async (dispatch) => {
    const result = await operationTimeService.getOperationTime();
    dispatch({ type: actions.UPDATE_OPERATION_TIME, payload: result });
    return result;
  },
  setOperationTime: (operationTime) => async (dispatch, getState) => {
    const { idToken } = await getState().Auth;
    const result = await operationTimeService.setOperationTime(idToken, operationTime);
    dispatch({ type: actions.UPDATE_OPERATION_TIME, payload: operationTime });
    return result;
  },
  getBlackout: () => async (dispatch) => {
    const result = await operationTimeService.getBlackout();
    const series = result.sort((a, b) => moment(b.start).diff(a.start));
    dispatch({ type: actions.UPDATE_BLACKOUT, payload: series });
    return result;
  },
  createBlackout: (blackout) => async (dispatch, getState) => {
    const { idToken } = await getState().Auth;
    const result = await operationTimeService.createBlackout(idToken, blackout);

    const { blackoutSeries } = await getState().OperationTime;
    const series = [...blackoutSeries, result].sort((a, b) => moment(b.start).diff(a.start));
    dispatch({ type: actions.UPDATE_BLACKOUT, payload: series });

    return result;
  },
  deleteBlackout: (blackoutId) => async (dispatch, getState) => {
    const { idToken } = await getState().Auth;
    const result = await operationTimeService.deleteBlackout(idToken, blackoutId);

    const { blackoutSeries } = await getState().OperationTime;
    const remain = blackoutSeries.filter((blackout) => blackout.blackoutId !== blackoutId);

    dispatch({ type: actions.UPDATE_BLACKOUT, payload: remain });
    return result;
  }
};
export default actions;
