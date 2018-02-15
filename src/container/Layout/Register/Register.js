import React, {Component} from 'react';
import './Register.css';

class Register extends Component {

    componentDidMount() {
        console.log(this.props);
    }
    // Fix it up if there is an error in the user database authentication
    render() {
        return (
            <div className="Register">
                
                <form method="post">
                    <h1>Registration Form</h1>
                    <p>Register to keep track of sent notifications</p>
                    <section>
                        <p>
                            <label htmlFor="register_name">Username: </label>
                            <input type="text" name="register_name"/>
                        </p>

                        <p>
                            <label htmlFor="register_password">Password: </label>
                            <input type="text" name="register_password"/>
                        </p>
                    </section>

                    <section>
                        <p><button type="submit">Submit</button></p>
                    </section>

                </form>
            </div>
        );
    }

}

export default Register;
