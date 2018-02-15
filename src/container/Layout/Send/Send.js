import React, {Component} from 'react';
import './Send.css';

class Send extends Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div className="Send">
                
                <form method="post">
                    <h1>Send a text reminder</h1>
                    <section>
                        <p>
                            <label htmlFor="send_to">Send To: </label>
                            <input type="text" name="send_to"/>
                        </p>
                        <p>
                            <label htmlFor="send_date">What Day: </label>
                            <input type="text" name="send_date"/>
                        </p>
                        <p>
                            <label htmlFor="send_time">What Time: </label>
                            <input type="text" name="send_time"/>
                        </p>
                        <p>
                            <label htmlFor="message">Message: </label>
                            <input type="text" className="SendMessage" name="send_message"/>
                        </p>
                    </section>

                    <section>
                        <p><button type="submit">Send out</button></p>
                    </section>

                </form>
            </div>
        );
    }

}

export default Send;
