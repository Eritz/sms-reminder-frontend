import * as actionTypes from '../actions/actions';

const initialState = {
    isLoggedIn: false,
    currentUser: "",
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        
        case actionTypes.LOGIN:
            let loggedIn = true;
            return {
                ...state,
                isLoggedIn: loggedIn,
            }
        case actionTypes.LOGOUT:
            let nowLoggedOut = false;
            return {
                ...state,
                isLoggedIn: nowLoggedOut,
            }
        default:
            return state;

    }
}

export default reducer;