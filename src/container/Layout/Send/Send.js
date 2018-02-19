import React, {Component} from 'react';
import './Send.css';
import * as actionCreator from '../../../store/actions/index';
import {phoneWithDashes, phoneWoDashes} from '../../../utility/phone';

import {connect} from 'react-redux';

import Loader from '../../../component/Loader/Loader';
import Sent from '../../../component/Sent';

class Send extends Component {

    state = {
        currentDay: null,
        phoneNumber: "",
        dateSend: "",
        timeSend: "",
        message: "",
        isReady: false,
    }

    componentDidMount() {
        this.getInputToday();
    }

    componentWillUnmount() {
        if (this.props.isSent) {
            this.isSentHandler();
        }
        this.setState({isReady: false});        
    }
    
    getInputToday = () => {
        // HTML Input date validation
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy= today.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        }
        today = yyyy+'-'+mm+'-'+dd;
        this.setState({currentDay: today}); 
    }

    isReadyHandler = () => {
        let readyToSend = (this.state.phoneNumber.length === 12 && this.state.dateSend !== "" && 
                            this.state.timeSend !== "" && this.state.message !== "");
        console.log(this.state.phoneNumber);
        this.setState({isReady: readyToSend});
    }

    phoneNumberHandler = (event) => {
        let number = phoneWithDashes(event.target.value)
        this.setState({phoneNumber: number});
    }

    dateSendHandler = (event) => {
        this.setState({dateSend: event.target.value});
        this.isReadyHandler();
    }

    timeSendHandler = (event) => {
        this.setState({timeSend: event.target.value});
        this.isReadyHandler();
    }

    messageHandler = (event) => {
        this.setState({message: event.target.value});
    }

    submitHandler = (event) => {
        let submitNumber = phoneWoDashes(this.state.phoneNumber);
        this.props.submitMessage(submitNumber, this.state.currentDay,
            this.state.dateSend, this.state.timeSend, this.state.message,
            this.props.username);
        event.preventDefault();
    }

    isSentHandler = () => {
        const empty = "";
        const notReady = false;
        this.props.changeIsSent();
        this.setState({
            isReady: notReady,
            phoneNumber: empty,
            dateSend: empty,
            timeSend: empty,
            message: empty,
        });
        this.getInputToday();
    }

    render() {
        return (
            <div className="Send">
                {this.props.isPending ? <Loader/> :  this.props.isSent ? <Sent goBack={this.isSentHandler}/> : 
                    <form onSubmit={this.submitHandler}>
                        <h1>Send a text reminder</h1>
                        <section>
                            <p>
                                <label htmlFor="send_to">Send To: </label>
                                <input type="tel" 
                                    name="phoneNumber" 
                                    placeholder="211-245-8871"
                                    value={this.state.phoneNumber}
                                    onChange={this.phoneNumberHandler}
                                    onBlur={this.isReadyHandler} 
                                    required
                                    />
                            </p>
                            <p>
                                <label htmlFor="send_date">What Day: </label>
                                <input type="date" 
                                    name="dateSend"
                                    value={this.state.dateSend}
                                    onChange={this.dateSendHandler} 
                                    min={this.state.currentDay}
                                    max="2223-01-01"
                                    required/>
                            </p>
                            <p>
                                <label htmlFor="send_time">What Time: </label>
                                <input type="time" 
                                    value={this.state.timeSend}
                                    onChange={this.timeSendHandler}
                                    name="timeSend" required/>
                            </p>
                            <p>
                                <label htmlFor="message">Message: </label>
                                <textarea
                                    rows="10" 
                                    cols="50" 
                                    className="SendMessage" 
                                    name="message"
                                    value={this.state.message}
                                    onChange={this.messageHandler}
                                    onKeyDown={this.isReadyHandler} 
                                    placeholder="Enter your message here..."
                                    maxLength="16000" required/>
                                <span className="MessageCount">({this.state.message.length}/16000)</span>
                            </p>
                        </section>

                        <section>
                            <p><button type="submit" disabled={!this.state.isReady}>Submit</button></p>
                        </section>
                    </form>}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isPending: state.sendRedu.isPending,
        isSent: state.sendRedu.isSent,
        username: state.accountRedu.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitMessage: (phoneNumber, dateMade, dateSend, timeSend, message, user) => 
                        dispatch(actionCreator.sendMessage(phoneNumber, dateMade, dateSend, timeSend, message, user)),
        changeIsSent: () => dispatch(actionCreator.sendMessageScreen()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Send);
