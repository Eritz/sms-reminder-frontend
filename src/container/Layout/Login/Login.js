import React, {Component} from 'react';
import './Login.css';
import * as actionCreator from '../../../store/actions/index';
import Loader from '../../../component/Loader/Loader';

import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    state = {
        needsToRegister : false,
        username: "",
        password: "",
        readyToSubmit: false,
        goToMain: false,
    }

    goToRegister = () => {
        this.setState({needsToRegister: true});
    }

    loginUsernameHandler = (event) => {
        this.setState({username: event.target.value});
    }

    loginPasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    checkNotEmptyHandler = () => {
        let disableButton = (this.state.username !== "") && (this.state.password !== "");
        this.setState({readyToSubmit:disableButton});
    }

    goToMainHandler = () => {
        this.setState({goToMain: true});
    }

    submitLoginHandler = (event) => {
        let user = this.state.username;
        let pass = this.state.password;
        this.props.submitLogin(user, pass, this.goToMainHandler);
        event.preventDefault()
    }

    render() {

        let redirect = null;
        if (this.state.needsToRegister) {
            redirect = <Redirect to="/register"/>
        }
        
        if (this.state.goToMain && this.props.isLoggedIn) {
            redirect = <Redirect to="/notifications/send"/>
        }

        return (
            <div className="Login">
                {redirect}
                {this.props.isLoginPend ? <Loader/> :
                    <form onSubmit={this.submitLoginHandler}>
                        <h1>Login</h1>
                        <p className="LoginInfo">Since I don't want to use emails for registration, if you lose an account, just quickly register a new username ;)</p>
                        <section>
                            <p>
                                <label htmlFor="login_name">Username: </label>
                                <input type="text" 
                                    name="login_name"
                                    value={this.state.username}
                                    onChange={this.loginUsernameHandler}
                                    onKeyUp={this.checkNotEmptyHandler}
                                    required/>
                            </p>

                            <p>
                                <label htmlFor="login_password">Password: </label>
                                <input type="password" 
                                    name="login_password"
                                    value={this.state.password}
                                    onChange={this.loginPasswordHandler}
                                    onKeyUp={this.checkNotEmptyHandler}
                                    required/>
                            </p>
                        </section>
                        <section>
                            <p><button type="submit" disabled={!this.state.readyToSubmit}>Submit</button></p>
                        </section>

                        <section>
                            <p style={{fontSize: "0.5em"}}>Don't have an account? Register
                                <span style={{color: "blue", cursor: "pointer"}} onClick={this.goToRegister}> here</span>.
                            </p>
                        </section>
                    </form>}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggingIn: state.accountRedu.isLoginPend,
        isLoggedIn: state.accountRedu.isLoggedIn,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitLogin: (user, pass, cb) => dispatch(actionCreator.accountLogin(user, pass, cb)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
