import React, {Component} from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    state = {
        needsToRegister : false,
    }

    componentDidMount() {
        console.log(this.props);
    }

    goToRegister = () => {
        this.setState({needsToRegister: true});
    }

    // Fix it up if there is an error in the user database authentication
    render() {

        let redirect = null;
        if (this.state.needsToRegister) {
            redirect = <Redirect to="/register"/>
        }

        return (
            <div className="Login">
                {redirect}
                <form method="post">
                    <h1>Login</h1>
                    <p>Since I don't want to use emails for registration. If you lose an account, just quickly register a new username ;)</p>
                    <section>
                        <p>
                            <label htmlFor="login_name">Username: </label>
                            <input type="text" name="login_name"/>
                        </p>

                        <p>
                            <label htmlFor="login_password">Password: </label>
                            <input type="text" name="login_password"/>
                        </p>
                    </section>
                    <section>
                        <p>Don't have an account? Register
                            <span style={{color: "blue", cursor: "pointer"}} onClick={this.goToRegister}> here</span>.
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

export default Login;
