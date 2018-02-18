import React, {Component} from 'react';
import './Register.css';
import * as actionCreator from '../../../store/actions/index';
import Loader from '../../../component/Loader/Loader';

import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

class Register extends Component {
    
    state = {
        username: "",
        password: "",
        verifyPassword: "",
        isReady: false,
        redirect: false,
    }

    componentDidMount() {
        console.log(this.props);
    }

    registerUsernameHandler = (event) => {
        this.setState({username: event.target.value});
    }

    registerPasswordHandler = (event) => {
        this.setState({password: event.target.value})
    }

    registerVerifyPasswordHandler = (event) => {
        this.setState({verifyPassword: event.target.value})
    }

    checkSamePasswordHandler = () => {
        let disableButton =  (this.state.password === this.state.verifyPassword) 
                            && (this.props.isNameTaken === false);
        this.setState({isReady: disableButton});
    }

    checkRegisterNameHandler = () => {
        let name = this.state.username;
        this.props.checkAvailable(name);
    }
    
    registerProcessHandler = (event) => {
        let user = this.state.username;
        let pass = this.state.password;
        this.props.submitRegister(user, pass, this.redirectHandler);
        event.preventDefault();
    }

    redirectHandler = () => {
        this.setState({redirect: true});
    }
    
    // check if Username is in database handler()

    // Fix it up if there is an error in the user database authentication
    render() {

        if (this.state.redirect) {
            return <Redirect to='/notifications/send'/>
        }

        const notSamePass = (this.state.verifyPassword.length > 0 && this.state.password !== this.state.verifyPassword) ? 
                        <span className="notSamePass">Password doesn't match</span>: null;

        const isNameTaken = this.props.isNameTaken ? <span className="nameTaken">Name Taken</span> : null;
        
        return (
            <div className="Register">
                {this.props.isRegistering ? <Loader/> :
                    <form onSubmit={this.registerProcessHandler}>
                        <h1>Registration Form</h1>
                        <p>Register to keep track of sent notifications</p>
                        <section>
                            <p>
                                <label htmlFor="register_name">Username: </label>
                                <input type="text" 
                                    name="register_name"
                                    value={this.state.username}
                                    onChange={this.registerUsernameHandler}
                                    onBlur={this.checkRegisterNameHandler}
                                    minLength="5"
                                    maxLength="22"
                                    required/>
                                {isNameTaken}
                            </p>

                            <p>
                                <label htmlFor="register_password">Password: </label>
                                <input type="password" 
                                    name="register_password"
                                    value={this.state.password}
                                    onChange={this.registerPasswordHandler}
                                    minLength="5"
                                    autoComplete="new-password"
                                    required/>

                            </p>

                            <p>
                                <label htmlFor="verify_password">Re-enter Password: </label>
                                <input type="password" 
                                    name="verify_password"
                                    value={this.state.verifyPassword}
                                    onChange={this.registerVerifyPasswordHandler}
                                    onKeyUp={this.checkSamePasswordHandler}
                                    autoComplete="off"
                                    required/>
                                {notSamePass}
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
        isRegistering: state.registerRedu.isRegistering,
        isNameTaken: state.registerRedu.isNameTaken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitRegister: (user, pass, cb) => dispatch(actionCreator.registerProcess(user, pass, cb)),
        checkAvailable: (user) => dispatch(actionCreator.checkRegisterName(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
