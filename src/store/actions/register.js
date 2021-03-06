import * as actionTypes from './actions';
import communicator from '../../utility/axios';

import {loginRequest, loginSuccess, loginFailure} from './account';

// Check if the name is available during registration
export const checkRegisterName = (info) => {
    return (dispatch) => {
        communicator.get('/register/' + info)
            .then(response => dispatch(changeIsNameTaken(response.data)));
    }
}

const changeIsNameTaken = (check) => {
    return {
        type: actionTypes.CHECK_REGISTER_USER,
        value: check,
    }
}

// Finalizing registration related
const createNewUser = (user, pass) => {
    return {
        username: user,
        password: pass,
    }
}

export const registerProcess = (user, pass, callback) => {
    return(dispatch) => {
        const newAccount = createNewUser(user,pass);
        dispatch(registerRequest());

        communicator.post('/register', newAccount)
            .then(response => {
                dispatch(loginRequest())
                communicator.post('/login', newAccount)
                    .then(response => {
                        console.log(response)
                        dispatch(loginSuccess(user))
                    })
                    .catch(error => {
                        dispatch(loginFailure())
                        alert(error)
                    })
            })
            .then(response => {
                dispatch(registerSuccess())
                callback()
            })
            .catch(error => {
                dispatch(registerFailure())
                alert("error")}
            );

    }
}

export const registerRequest = () => {
    return {
        type: actionTypes.REGISTER_REQUEST,
        value: true,
    }
}

export const registerSuccess = () => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        value: false,
    }
}

export const registerFailure = () => {
    return {
        type: actionTypes.REGISTER_FAILURE,
        value: false,
    }
}

