import * as actionTypes from '../actions/actions';

const initialState = {
    isPending: false,
    isSent: false,
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        
        case actionTypes.SEND_MESSAGE_PENDING:
            let nowPending = true;
            return {
                ...state,
                isPending: nowPending,
            }
        case actionTypes.SEND_MESSAGE_SUCCESS:
            let finishPending = false;
            let finishSending = true;
            return {
                ...state,
                isPending: finishPending,
                isSent: finishSending,
            }
        
        case actionTypes.SEND_MESSAGE_FAILURE:
            let errorFinishPend = false;
            alert(action.error);
            return {
                ...state,
                isPending: errorFinishPend,
            }
        case actionTypes.SEND_MESSAGE_SCREEN:
            let sendMore = false;
            return {
                ...state,
                isSent: sendMore,
            }
        default:
            return state;
    }
}

export default reducer;