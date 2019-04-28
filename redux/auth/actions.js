import auth from './helper';
import { setToken, removeToken } from '../../helpers/token';
import authService from '../../coreLayer/service/authService';

const actions = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  JWT_LOGIN_REQUEST: 'JWT_LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_ERROR: 'REGISTER_ERROR',
  login: (userInfo) => async (dispatch) => {
    const result = await auth.login(userInfo);
    if (result.error) {
      dispatch({ type: actions.LOGIN_ERROR });
    } else {
      dispatch({ type: actions.LOGIN_SUCCESS, token: result.accessToken, profile: result.profile });
      setToken(result.accessToken);
    }
    return result;
  },
  loginJwt: (token) => async (dispatch) => {
    const result = await auth.loginJWT(token);
    if (result.error) {
      dispatch({ type: actions.LOGIN_ERROR });
    } else {
      dispatch({ type: actions.LOGIN_SUCCESS, token: result.accessToken, profile: result.profile });
      setToken(result.accessToken);
    }
    return result;
  },
  logout: () => async (dispatch) => {
    dispatch({ type: actions.LOGOUT });
    removeToken();
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
  }
};
export default actions;
