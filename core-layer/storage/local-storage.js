export const STORAGE_KEY = {
    ACCESS_TOKEN: 'accessToken'
}

function storeAccessToken(token) {
    if (window.localStorage) {
        localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, token);
    }
}
function getAccessToken() {
    if (window.localStorage) {
        return localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    }
    return null;
}

export const STORAGE = {
    storeAccessToken,
    getAccessToken
}