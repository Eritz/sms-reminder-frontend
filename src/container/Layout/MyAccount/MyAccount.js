import React, {Component} from 'react';
import './MyAccount.css';
import * as actionCreator from '../../../store/actions/index';

import {connect} from 'react-redux';

class MyAccount extends Component {
    state ={}

    componentDidMount() {
        console.log(this.props);

    }

    render() {
        return(
            <div className="MyAccount">
                <h1>All your notifications</h1>
                <table className="MyAccount-notification">
                    <thead>
                        <tr>
                            <th>TemporaryId</th>
                            <th>Date Made</th>
                            <th>Date Sent</th>
                            <th>Time Sent</th>
                            <th>Phone Sent</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.accountRedu.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(MyAccount);