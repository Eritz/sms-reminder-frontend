import * as actionTypes from './actions';
import communicator from '../../axios';

const startAccountLogin = (user, pass) => {
    return {
        username: user,
        password: pass,
    }
}

export const accountLogin = (user, pass, callback) => {
    return (dispatch) => {
        const userAccount = startAccountLogin(user, pass);
        dispatch(loginRequest());

        communicator.post('/login', userAccount)
            .then(response => {
                dispatch(loginSuccess())
                callback();
            })
            .catch(error => dispatch(loginFailure()));
    }
}

// We set post body as null to force a bad url
// with the bad url, we will then make a successful logout change.
// Then issue a callback to go back to the /login screen.
export const startAccountLogout = (cb) => {
    return (dispatch) => {
        communicator.post('/logout', null)
            .then()
            .catch(error => {
                dispatch(accountLogout());
                cb()
            });
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