import * as actionTypes from './actions';

export const accountLogin = () => {
    return {
        type: actionTypes.LOGIN,
    }
}

export const accountLogout = () => {
    return {
        type: actionTypes.LOGOUT,
    }
}

export const loginRequest = () => {
    return {
        type: actionTypes.LOGIN_REQUEST,
    }
}

export const loginSuccess = () => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
    }
}

export const loginFailure = () => {
    return {
        type: actionTypes.LOGIN_FAILURE,
    }
}