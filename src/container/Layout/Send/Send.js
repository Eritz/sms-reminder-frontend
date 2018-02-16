import React, {Component} from 'react';
import './Send.css';
import * as actionCreator from '../../../store/actions/index';

import {connect} from 'react-redux';
import uuidv4 from 'uuid';

import Loader from '../../../component/Loader/Loader';
import Sent from '../../../component/Sent';

class Send extends Component {

    state = {
        currentDay: null,
        id: "",
        phoneNumber: "",
        dateSend: "",
        timeSend: "",
        message: "",
    }

    componentDidMount() {
        console.log(this.props);
        this.getInputToday();
        this.idHandler();
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

    idHandler = () => {
        let notificationId = uuidv4();
        this.setState({id: notificationId});
    }

    phoneNumberHandler = (event) => {
        this.setState({phoneNumber: event.target.value});
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
        this.props.submitMessage(this.state.id, this.state.phoneNumber, this.state.currentDay,
             this.state.dateSend, this.state.timeSend, this.state.message);
        event.preventDefault();
    }

    isSentHandler = () => {
        this.idHandler();
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
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                            </p>
                            <p>
                                <label htmlFor="send_date">What Day: </label>
                                <input type="date" 
                                    name="dateSend"
                                    value={this.state.dateSend}
                                    onChange={this.dateSendHandler} 
                                    min={this.state.currentDay} required/>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitMessage: (id, phoneNumber, dateMade, dateSend, timeSend, message) => 
                        dispatch(actionCreator.sendMessage(id, phoneNumber, dateMade, dateSend, timeSend, message)),
        changeIsSent: () => dispatch(actionCreator.sendMessageScreen()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Send);
