function storeCookie(key, value, expiresIn) {
    const now = new Date();
    now.setTime(now.getTime() + expiresIn * 1000);
    document.cookie = `${key}=${value}`;
    document.cookie = `expires=${now.toUTCString()}`
}

export {
    storeCookie
}