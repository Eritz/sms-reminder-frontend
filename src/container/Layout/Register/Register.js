import React, {Component} from 'react';
import './Register.css';
import {registerInfo, registerUserInfo, registerPassInfo} from './index'
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
                            && (this.props.isNameTaken === false) && (this.state.password.length >= 5);
        this.setState({isReady: disableButton});
    }

    checkRegisterNameHandler = () => {
        let name = this.state.username;
        name = name.trim();
        this.props.checkAvailable(name);
    }
    
    registerProcessHandler = (event) => {
        let user = this.state.username;
        user = user.trim();
        let pass = this.state.password;
        this.props.submitRegister(user, pass, this.redirectHandler);
        event.preventDefault();
    }

    redirectHandler = () => {
        this.setState({redirect: true});
    }
    
    render() {

        if (this.state.redirect) {
            return <Redirect to='/notifications/send'/>
        }

        const lessThanFive = (this.state.password.length >= 1 && this.state.password.length < 5) ?
                        <span className="lessThanFive">Password is less than 5 char</span> : null;

        const notSamePass = (this.state.verifyPassword.length > 0 && this.state.password !== this.state.verifyPassword) ? 
                        <span className="notSamePass">Password doesn't match</span>: null;

        const isNameTaken = this.props.isNameTaken ? <span className="nameTaken">Name Taken</span> : null;
        
        return (
            <div className="Register">
                {this.props.isRegistering ? <Loader/> :
                    <form onSubmit={this.registerProcessHandler}>
                        <h1>Registration Form</h1>
                        <div className="RegisterInfo">
                            <p>{registerInfo}</p>
                            <p>{registerUserInfo}<br/>No white spaces allowed.</p>
                            <p>{registerPassInfo}</p>
                        </div>
                        <section>
                            <p>
                                <label htmlFor="register_name">Username: </label>
                                <input type="text" 
                                    name="register_name"
                                    value={this.state.username}
                                    onChange={this.registerUsernameHandler}
                                    onBlur={this.checkRegisterNameHandler}
                                    pattern="^(?=.*?[a-zA-Z]).{5,22}$"
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
                                {lessThanFive}
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
