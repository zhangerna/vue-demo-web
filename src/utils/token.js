import Cookies from 'js-cookie'

const expireAtKey = "nonda-saas-token-expire-at";
const userNameKey = "nonda-saas-user";
const userIdKey = "nonda-saas-userId";
export function saveTokenExpireAt(expireAt) {
    if (window.localStorage) {
        localStorage.setItem(expireAtKey, expireAt);
    } else {
        Cookies.set(expireAtKey, expireAt, {expires: 7})
    }
}

export function getTokenExpireAt() {
    if (window.localStorage) {
        return localStorage.getItem(expireAtKey);
    } else {
        return Cookies.get(expireAtKey)
    }
}

export function saveUserInfo(username) {
    if (window.localStorage) {
        localStorage.setItem(userNameKey, username);
    } else {
        Cookies.set(userNameKey, username, {expires: 365});
    }
}

export function saveUserId(userId) {
    if (window.localStorage) {
        localStorage.setItem(userIdKey, userId);
    } else {
        Cookies.set(userIdKey, userId, {expires: 365});
    }
}

export function getUsername() {
    if (window.localStorage) {
        return localStorage.getItem(userNameKey);
    } else {
        return Cookies.get(userNameKey);
    }
}

export function getUserId() {
    if (window.localStorage) {
        return localStorage.getItem(userIdKey);
    } else {
        return Cookies.get(userIdKey);
    }
}
