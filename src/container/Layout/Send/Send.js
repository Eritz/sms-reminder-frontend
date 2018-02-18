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
    }

    componentDidMount() {
        this.getInputToday();
    }

    componentWillUnmount() {
        if (this.props.isSent) {
            this.isSentHandler();
        }
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

    phoneNumberHandler = (event) => {
        let number = phoneWithDashes(event.target.value)
        this.setState({phoneNumber: number});
    }

    addDashesHandler = (event) => {
        
    }

    dateSendHandler = (event) => {
        this.setState({dateSend: event.target.value});
    }

    timeSendHandler = (event) => {
        this.setState({timeSend: event.target.value});
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
        this.props.changeIsSent();
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
                                    max="2100-01-01"
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
                                <input type="text" 
                                    className="SendMessage" 
                                    name="message"
                                    value={this.state.message}
                                    onChange={this.messageHandler} 
                                    placeholder="Enter your message here..." required/>
                            </p>
                        </section>

                        <section>
                            <p><button type="submit">Send out</button></p>
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
