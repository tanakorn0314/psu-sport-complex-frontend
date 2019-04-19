import jwtDecode from 'jwt-decode';
import authService from '../coreLayer/service/authService';

const login = async userInfo => {
    if (!userInfo.phoneNumber || !userInfo.password) {
        return { error: 'please fill in the input' };
    }
    return await authService.signIn(userInfo.phoneNumber, userInfo.password)
        .then(res => {
            const result = {};
            if (res.accessToken) {
                result.profile = jwtDecode(res.accessToken);
                result.accessToken = res.accessToken;
                return result;
            }
        })
        .catch(error => ({ error }));
};

const loginJWT = async token => {
    if (!token) {
        return { error: 'token invalid'}
    }
    return await authService.signWithToken(token)
        .then(res => {
            const result = {};
            if (res.accessToken) {
                result.profile = jwtDecode(res.accessToken);
                result.accessToken = res.accessToken;
                return result;
            }
        })
        .catch(error => ({ error }));
}

const register = async userInfo => {
    return await authService.signup(userInfo)
        .then(res => {
            const result = res;
            return result;
        })
        .catch(error => ({ error }));
}
export default {
    login,
    loginJWT,
    register
};
