const actions = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    JWT_LOGIN_REQUEST: 'JWT_LOGIN_REQUEST',
    LOGOUT: 'LOGOUT',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    REGISTER_REQUEST: 'REGISTER_REQUEST',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_ERROR: 'REGISTER_ERROR',
    login: userInfo => ({
      type: actions.LOGIN_REQUEST,
      payload: { userInfo }
    }),
    loginJwt: (token) => ({
      type: actions.JWT_LOGIN_REQUEST,
      payload: { token }
    }),
    logout: () => ({
      type: actions.LOGOUT
    }),
    register: userInfo => ({
      type: actions.REGISTER_REQUEST,
      payload: { userInfo }
    })
  };
  export default actions;
  