import React, {Component} from 'react';
import './MyAccount.css';
import * as actionCreator from '../../../store/actions/index';
import {phoneWithDashes} from '../../../utility/phone';
import Loader from '../../../component/Loader/Loader';
import {connect} from 'react-redux';

class MyAccount extends Component {

    componentDidMount() {
        this.props.getUserNotifications(this.props.username);
    }

    render() {

        const allNotifications = this.props.notificationList.map(ele => {
            const phone = phoneWithDashes(ele.phoneNumber);
            return(
                <tr key={ele.id}>
                    <th>{ele.dateMade}</th>
                    <th>{ele.dateSend}</th>
                    <th>{ele.timeSend}</th>
                    <th>{phone}</th>
                    <th>{ele.message}</th>
                    <th>{ele.status}</th>
                </tr>
            );
        })

        return(
            <div className="MyAccount">
                {this.props.notificationPend ? <Loader/> :
                    <div>
                    <h1>All Your Notifications {"("+this.props.notificationList.length+")"}</h1>
                        <table className="MyAccount-notification">
                            <thead>
                                <tr>
                                    <th>Date Made</th>
                                    <th>Date Sent</th>
                                    <th>Time Sent</th>
                                    <th>Phone Sent</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allNotifications}
                            </tbody>
                            <div></div>
                        </table>
                    </div>}
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.accountRedu.user,
        notificationList: state.accountRedu.notificationList,
        notificationPend: state.accountRedu.notificationPend,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserNotifications: (user) => dispatch(actionCreator.getUserNotifications(user)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyAccount);