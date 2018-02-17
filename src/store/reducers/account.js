import * as actionTypes from '../actions/actions';

const initialState = {
    isLoggedIn: false,
    isLoginPend: false,
    user: "",
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        
        case actionTypes.LOGOUT:
            let nowLoggedOut = false;
            let empty = "";
            return {
                ...state,
                isLoginPend: nowLoggedOut,
                isLoggedIn: nowLoggedOut,
                user: empty,
            }
        
        case actionTypes.LOGIN_REQUEST:
            let loginPending = true;
            let notLoggedIn = false;
            return {
                ...state,
                isLoginPend: loginPending,
                isLoggedIn: notLoggedIn,
            }
        
        case actionTypes.LOGIN_SUCCESS:
            let username = action.value; 
            let loginPendSuccess = false;
            let nowLoggedIn = true;
            return {
                ...state,
                isLoginPend: loginPendSuccess,
                isLoggedIn: nowLoggedIn,
                user: username, 
            }
        
        case actionTypes.LOGIN_FAILURE:
            let loginPendFail = false;
            let loginAttempt = false;
            return {
                ...state,
                isLoginPend: loginPendFail,
                isLoggedIn: loginAttempt,
            }

        default:
            return state;

    }
}

export default reducer;