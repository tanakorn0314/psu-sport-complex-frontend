import { authApi } from '../api';
import Request from '../Request';

const signIn = async (signInfo, password) => {
    const url = `${authApi}/signin/`;
    const body = {
        signInfo,
        password
    }

    const req = new Request(url, 'POST');
    req.setBody(body);
    
    return await req.send();
}

const signWithToken = async (accessToken) => {
    const url = `${authApi}/sign_token`;
    const body = { accessToken }
    
    const req = new Request(url, 'POST');
    req.setBody(body);
    
    return await req.send();
}

const signup = async (user) => {
    const url = `${authApi}/signup/`;
    const body = user;

    const req = new Request(url, 'POST');
    req.setBody(body);
    
    return await req.send();
}

const sendResetRequest = async (phoneNumber) => {
    const url = `${authApi}/forget_password`;
    const body = { phoneNumber };

    const req = new Request(url, 'POST');
    req.setBody(body);
    
    return await req.send();
}

const resetPassword = async (token, password) => {
    const url = `${authApi}/reset/${token}`;
    const body = { password }

    const req = new Request(url, 'PATCH');
    req.setBody(body);
    
    return await req.send();
}

const signout = async (accessToken) => {
    const url = `${authApi}/signout/`;
    const body = { accessToken }

    const req = new Request(url, 'POST');
    req.setBody(body);
    
    return await req.send();
}

export default {
    signIn,
    signWithToken,
    signup,
    sendResetRequest,
    resetPassword,
    signout
}