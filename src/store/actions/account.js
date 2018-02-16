import * as actionTypes from './actions';
import communicator from '../../axios';

const startAccountLogin = (user, pass) => {
    return {
        username: user,
        password: pass,
    }
}

export const accountLogin = (user, pass) => {
    return (dispatch) => {
        const userAccount = startAccountLogin(user, pass);
        dispatch(loginRequest());

        communicator.post('/login', userAccount)
            .then(response => dispatch(loginSuccess()))
            .catch(error => dispatch(loginFailure()));
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