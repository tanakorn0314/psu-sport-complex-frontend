import auth from './helper';
import { setToken, removeToken, setExpires, removeExpires } from '../../helpers/token';
import authService from '../../core/service/authService';
import BookingAction from '../booking/actions';
import { Router } from '../../i18n';

const actions = {
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  SET_AUTH_GUARD: 'SET_AUTH_GUARD',
  login: (userInfo) => async (dispatch) => {
    const result = await auth.login(userInfo);
    if (result && !result.error) {
      const owner = auth.ownerFromToken(result.accessToken);
      dispatch({ type: actions.LOGIN_SUCCESS, token: result.accessToken, profile: result.profile });
      dispatch(BookingAction.setOwner(owner));
      setToken(result.accessToken);
      setExpires(result.expiresAt);
    }
    return result;
  },
  loginJwt: (token) => async (dispatch) => {
    const result = await auth.loginJWT(token);
    if (result && !result.error) {
      const owner = auth.ownerFromToken(result.accessToken);
      dispatch({ type: actions.LOGIN_SUCCESS, token: result.accessToken, profile: result.profile });
      dispatch(BookingAction.setOwner(owner));
      setToken(result.accessToken);
      setExpires(result.expiresAt);
    }
    return result;
  },
  logout: () => async (dispatch, getState) => {
    const { idToken, authGuard } = getState().Auth;
    const result = await authService.signout(idToken);
    if (authGuard)
      await Router.replace('/booking');
    if (result && !result.error) {
      dispatch({ type: actions.LOGOUT });
      removeToken();
      removeExpires();
    }
    return result;
  },
  register: userInfo => async () => {
    const result = await auth.register(userInfo);
    return result;
  },
  sendResetRequest: phoneNumber => async () => {
    const result = await authService.sendResetRequest(phoneNumber);
    return result;
  },
  resetPassword: (token, password) => async () => {
    if (!password)
      return { error: 'Password required' };
    const result = await authService.resetPassword(token, password);
    return result;
  },
  setAuthGuard: (authGuard) => (dispatch) => {
    dispatch({ type: actions.SET_AUTH_GUARD, authGuard });
  }
};
export default actions;
