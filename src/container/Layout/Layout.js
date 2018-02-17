import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, NavLink, Switch, withRouter} from 'react-router-dom';

import Send from './Send/Send';
import About from './About/About';
import Register from './Register/Register';
import Login from './Login/Login';
import Logout from './Logout/Logout';

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
                                to="/notifications"
                                exact
                                >SMS-Reminder</NavLink></li>
                            <li><NavLink
                                to="/about"
                                exact
                                >About</NavLink></li>
                            <li><NavLink
                                to="/register"
                                exact
                                >Register</NavLink></li>
                            <li>{this.props.loggedInStatus ? 
                                <NavLink to="/logout" exact>Logout</NavLink> :
                                <NavLink to="/login" exact>Login</NavLink>}</li> 
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/notifications" component={Send}/>
                    <Route path="/about" component={About}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/logout" component={Logout}/>
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
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));

