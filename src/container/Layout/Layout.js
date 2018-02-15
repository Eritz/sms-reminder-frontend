import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, NavLink, Switch, withRouter} from 'react-router-dom';

import Send from './Send/Send';
import Register from './Register/Register';
import Login from './Login/Login';

import * as actionCreator from '../../store/actions/index';
import './Layout.css';

class Layout extends Component {
    render() {
        return(
            <div className="Layout">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/notifications/send"
                                exact
                                >SMS-Reminder</NavLink></li>
                            <li>About</li>
                            <li><NavLink
                                to="/register"
                                exact
                                >Register</NavLink></li>
                            <li>{this.props.loggedInStatus ? "Logout" : <NavLink to="/login" exact>Login</NavLink>}</li> 
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/notifications/send" component={Send}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedInStatus: state.accountRedu.isLoggedIn,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginAccount: () => dispatch(actionCreator.accountLogin()),
        logoffAccount: () => dispatch(actionCreator.accountLogout()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));

