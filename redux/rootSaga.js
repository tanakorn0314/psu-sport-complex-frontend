import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import bookingSagas from './booking/saga';

export default function* rootSaga(getState) {
	yield all([
		authSagas(),
		bookingSagas(),
	]);
}
