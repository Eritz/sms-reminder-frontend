import * as actionTypes from './actions';
import communicator from '../../utility/axios';


export const packageMessage = (phoneNumber, dateMade, dateSend, timeSend, message, user) => {
    return {
        dateMade: dateMade,
        dateSend: dateSend,
        timeSend: timeSend,
        phoneNumber: phoneNumber,
        message: message,
        status: "Pending",
        username: user,
    }
}

export const sendMessage = (phoneNumber, dateMade, dateSend, timeSend, message, user) => {
    const name = (user==="" ? "GUEST" : user);
    return(dispatch) => {
        const notification = packageMessage(phoneNumber,dateMade,dateSend,timeSend,message, name);
        dispatch(sendMessagePending());
        communicator.post('/notifications', notification)
            .then(response => dispatch(sendMessageSuccess()))
            .catch(error => dispatch(sendMessageFailure(error)));
    }
}

export const sendMessagePending = () => {
    return {
        type: actionTypes.SEND_MESSAGE_PENDING,
    }
}

export const sendMessageSuccess = () => {
    return {
        type: actionTypes.SEND_MESSAGE_SUCCESS,
    }
}

export const sendMessageFailure = (error) => {
    return {
        type: actionTypes.SEND_MESSAGE_FAILURE,
        value: error,
    }
}

export const sendMessageScreen = () => {
    return {
        type: actionTypes.SEND_MESSAGE_SCREEN,
    }
}
