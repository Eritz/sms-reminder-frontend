import * as actionTypes from '../actions/actions';

const initialState = {
    isRegistering: false,
}

const reducer = (state=initialState, action) => {
    switch (action.type) {

        case actionTypes.REGISTER_REQUEST:
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.REGISTER_FAILURE:
            return {
                ...state,
                isRegistering: action.value,
            }
        default:
            return state;
    }
}

export default reducer;