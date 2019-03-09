import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { setToken, removeToken } from '../../helpers/token';
import actions from './actions';
import auth from '../../helpers/authentication';
import Router from 'next/router';

export function* loginRequest() {
  yield takeEvery(actions.LOGIN_REQUEST, function* ({ payload }) {
    const result = yield call(auth.login, payload.userInfo);
    if (result.error) {
      yield put({ type: actions.LOGIN_ERROR });
    } else {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: result.accessToken,
        profile: result.profile,
      });
    }
  });
}

export function* jwtLoginRequest() {
  yield takeEvery(actions.JWT_LOGIN_REQUEST, function*({ payload }) {
    const result = yield call(auth.loginJWT, payload.token);
    if (result.error) {
      yield put({ type: actions.LOGIN_ERROR });
    } else {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: result.accessToken,
        profile: result.profile,
        isJwt: true,
      });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    yield setToken(payload.token);
    if (!payload.isJwt)
      Router.replace('/');
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () { });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    removeToken();
  });
}

export function* register() {
  yield takeEvery(actions.REGISTER_REQUEST, function*({ payload }) {
    const result = yield call(auth.register, payload.userInfo);
    if (result.error) {
      yield put({ 
        type: actions.REGISTER_ERROR,
        error: result.error
      });
    } else {
      yield put({ type: actions.REGISTER_SUCCESS });
    }
  })
}

export function* registerSuccess() {
  yield takeEvery(actions.REGISTER_SUCCESS, function*() {
    alert('register success');
    Router.push('/signin');
  })
}

export function* registerError() {
  yield takeEvery(actions.REGISTER_ERROR, function*({error}) {
    alert(error);
  })
}

export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(jwtLoginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
    fork(register),
    fork(registerSuccess),
    fork(registerError)
  ]);
}
