import jwtDecode from 'jwt-decode';
import authService from '../../core/service/authService';

const login = async userInfo => {
    if (!userInfo.signInfo || !userInfo.password) {
        return { error: 'please fill in the input' };
    }
    const response = await authService.signIn(userInfo.signInfo, userInfo.password);
    return responseToUser(response);
};

const loginJWT = async token => {
    if (!token) {
        return { error: 'token invalid' }
    }
    const response = await authService.signWithToken(token)
    return responseToUser(response);
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

const responseToUser = (response) => {
    if (response && response.accessToken) {
        return {
            user: jwtDecode(response.accessToken),
            accessToken: response.accessToken,
            expiresAt: response.expiresAt
        }
    } 
    return response;
}

export default {
    login,
    loginJWT,
    register,
    ownerFromToken
};
