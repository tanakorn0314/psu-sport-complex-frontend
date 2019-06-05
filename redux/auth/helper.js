import jwtDecode from 'jwt-decode';
import authService from '../../core/service/authService';
import { errors } from '../../common/text';

const login = async userInfo => {
    if (!userInfo.signInfo || !userInfo.password) {
        return { error: errors('please fill in the input') };
    }
    return await authService.signIn(userInfo.signInfo, userInfo.password)
        .then(res => {
            const result = {};
            if (res.accessToken) {
                result.profile = jwtDecode(res.accessToken);
                result.accessToken = res.accessToken;
                result.expiresAt = res.expiresAt;
                return result;
            }
        })
        .catch(error => (error));
};

const loginJWT = async token => {
    if (!token) {
        return { error: errors('token invalid') }
    }
    return await authService.signWithToken(token)
        .then(res => {
            const result = {};
            if (res.accessToken) {
                result.profile = jwtDecode(res.accessToken);
                result.accessToken = res.accessToken;
                result.expiresAt = res.expiresAt;
                return result;
            }
        })
        .catch(error => (error));
}

const register = async userInfo => {
    return await authService.signup(userInfo)
        .then(res => {
            const result = res;
            return result;
        })
        .catch(error => (error));
}

const ownerFromToken = (token) => {
    const user = jwtDecode(token);
    const info = user.psuPassport.length > 0 ? user.psuPassport : user.phoneNumber;
    const owner = {
        name: `${user.fname} ${user.lname}`,
        info,
        position: user.position
    }
    return owner;
}

export default {
    login,
    loginJWT,
    register,
    ownerFromToken
};
