import React, {Component} from 'react';
import './Register.css';
import * as actionCreator from '../../../store/actions/index';
import Loader from '../../../component/Loader/Loader';

import {connect} from 'react-redux';

class Register extends Component {
    
    state = {
        username: "",
        password: "",
        verifyPassword: "",
        isReady: false,
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
        let disableButton =  (this.state.password === this.state.verifyPassword);
        this.setState({isReady: disableButton});
    }
    
    registerProcessHandler = (event) => {
        let user = this.state.username;
        let pass = this.state.password;
        this.props.submitRegister(user, pass);
        event.preventDefault();
    }
    
    // check if Username is in database handler()

    // Fix it up if there is an error in the user database authentication
    render() {
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
                                    required/>
                            </p>

                            <p>
                                <label htmlFor="register_password">Password: </label>
                                <input type="password" 
                                    name="register_password"
                                    value={this.state.password}
                                    onChange={this.registerPasswordHandler}
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitRegister: (user, pass) => dispatch(actionCreator.registerProcess(user, pass)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
