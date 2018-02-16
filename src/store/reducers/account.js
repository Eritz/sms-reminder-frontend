import * as actionTypes from '../actions/actions';

const initialState = {
    isLoggedIn: false,
    user: "",
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        
        case actionTypes.LOGIN:
            let loggedIn = true;
            return {
                ...state,
            }
        case actionTypes.LOGOUT:
            let nowLoggedOut = false;
            return {
                ...state,
            }
        default:
            return state;

    }
}

export default reducer;