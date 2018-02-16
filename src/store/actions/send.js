import * as actionTypes from './actions';
import communicator from '../../axios';


export const packageMessage = (id, phoneNumber, dateMade, dateSend, timeSend, message) => {
    return {
        id: id,
        dateMade: dateMade,
        dateSend: dateSend,
        timeSend: timeSend,
        phoneNumber: phoneNumber,
        message: message,
        status: "Pending"
    }
}

export const sendMessage = (id, phoneNumber, dateMade, dateSend, timeSend, message) => {
    return(dispatch) => {
        const notification = packageMessage(id,phoneNumber,dateMade,dateSend,timeSend,message);
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