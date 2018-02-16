import * as actionTypes from './actions';
import communicator from '../../axios';

const createNewUser = (user, pass) => {
    return {
        username: user,
        password: pass,
    }
}

export const registerProcess = (user, pass) => {
    return(dispatch) => {
        const newAccount = createNewUser(user,pass);
        dispatch(registerRequest());
        // Set User Authentication

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

