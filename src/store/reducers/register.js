import * as actionTypes from '../actions/actions';

const initialState = {
    isRegistering: false,
}

const reducer = (state=initialState, action) => {
    switch (action.type) {

        case actionTypes.REGISTER_REQUEST:
            let registerLoad = action.value;
            return {
                ...state,
                isRegistering: registerLoad,
            }

        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.REGISTER_FAILURE:
            let registerStop = action.value;
            return {
                ...state,
                isRegistering: registerStop,
            }

        default:
            return state;
    }
}

export default reducer;