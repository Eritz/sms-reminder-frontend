import React, {Component} from 'react';
import './Logout.css';
import * as actionCreator from '../../../store/actions/index';
import Loader from '../../../component/Loader/Loader';

import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

class Logout extends Component {

    state = {
        redirect: false,
    }

    componentDidMount() {
        this.props.submitLogoff(this.logoutHandler);
    }

    logoutHandler = () => {
        this.setState({redirect: true});
    }

    render() {
        // Hack for basic auth
        if (this.state.redirect) {
            return <Redirect to='/login'/>
        }
        
        return(
            <div className="Logout">
                <h1>Logging off</h1>
                <Loader/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        submitLogoff: (cb) => dispatch(actionCreator.startAccountLogout(cb)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);