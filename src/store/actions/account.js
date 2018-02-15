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