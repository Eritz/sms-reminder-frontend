import * as actionTypes from './actions';
import communicator from '../../axios';

import {loginRequest, loginSuccess, loginFailure} from './account';

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
                alert(error)}
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

