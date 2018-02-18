import * as actionTypes from '../actions/actions';

const initialState = {
    isLoggedIn: false,
    isLoginPend: false,
    user: "",
    notificationList: [],
    notificationPend: false,
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
        // Notification Related
        case actionTypes.GET_USER_NOTIFICATIONS:
            let allUserNotifications = action.value;
            console.log(allUserNotifications);
            return {
                ...state,
                notificationList: allUserNotifications,
            }
        
        case actionTypes.PEND_USER_NOTIFICATIONS:
            let pendUserNotification = true;
            return {
                ...state,
                notificationPend: pendUserNotification,
            }
        
        case actionTypes.PEND_USER_NOTIFICATIONS_SUCCESS:
            let successNotiPend = false;
            return {
                ...state,
                notificationPend: successNotiPend,
            }
        case actionTypes.PEND_USER_NOTIFICATIONS_FAILURE:
            let failNotiPend = false;
            return {
                ...state,
                notificationPend: failNotiPend,
            }
            

        default:
            return state;

    }
}

export default reducer;