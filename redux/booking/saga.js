import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import actions from './actions';
import BookingService from '../../coreLayer/service/bookingService';

export function* fetchBooking() {
  yield takeEvery(actions.FETCH_BOOKING, function* ({ payload }) {
    const result = yield call(BookingService.getByCourtId, payload.token, payload.courtId);
    if (result.error) {
      yield put({ type: actions.FETCH_BOOKING_ERROR });
    } else {
      yield put({
        type: actions.FETCH_BOOKING_SUCESS,
        bookings: result,
      });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(fetchBooking),
  ]);
}
