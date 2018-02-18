import * as actionTypes from './actions';
import communicator from '../../utility/axios';

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
                dispatch(loginSuccess(user))
                callback();
            })
            .catch(error => dispatch(loginFailure()));
    }
}

// We set post body as null to force a bad url
// with the bad url, we will then make a successful logout change.
// Then issue a callback to go back to the /login screen.
export const startAccountLogout = (callback) => {
    return (dispatch) => {
        communicator.post('/logout', null)
            .then()
            .catch(error => {
                dispatch(accountLogout());
                callback()
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

export const loginSuccess = (user) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        value: user,
    }
}

export const loginFailure = () => {
    return {
        type: actionTypes.LOGIN_FAILURE,
    }
}

// User notification Related
export const getUserNotifications = (username) => {
    return (dispatch) => {
        const url = '/users/' + username +'/notifications';
        if (username==="") {
            return;
        }
        dispatch(pendUserNotifications())    
        communicator.get(url)
            .then(response => {
                dispatch(populateUserNotifications(response.data))
                dispatch(pendUserNotificationSuccess())
            })
            .catch(error => {
                dispatch(pendUserNotificationFailure())
                alert(error)
            });
    }
}

export const populateUserNotifications = (list) => {
    return {
        type: actionTypes.GET_USER_NOTIFICATIONS,
        value: list,
    }
}

const pendUserNotifications = () => {
    return {
        type: actionTypes.PEND_USER_NOTIFICATIONS,
    }
}

const pendUserNotificationSuccess = () => {
    return {
        type: actionTypes.PEND_USER_NOTIFICATIONS_SUCCESS,
    }
}

const pendUserNotificationFailure = () => {
    return {
        type: actionTypes.PEND_USER_NOTIFICATIONS_FAILURE,
    }
}

