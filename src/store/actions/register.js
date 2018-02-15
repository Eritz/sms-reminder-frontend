import * as actionTypes from './actions';

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

