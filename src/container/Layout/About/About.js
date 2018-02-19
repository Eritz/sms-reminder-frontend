import React, {Component} from 'react';
import './About.css';

class About extends Component {
    render() {
        return (
            <div className="About">
                <div>
                    <h1>What is this?</h1>
                    <p>
                        This web app will send free SMS reminders to United States carriers using Twilio's API. Registration is not required <br/>
                        but registering will allow tracking all sent notifications. Messages are sent via a Twilio trial account.
                        <br/>Standard SMS fees and pricing related information applies when using this service.<br/>
                        <br/>The back end code can 
                        be found <a
                            target="_blank"
                            rel="noopener noreferrer" 
                            href="https://github.com/Eritz/sms-spring-boot-reminder" 
                            style={{cursor: "pointer", color: "blue"}}>here</a>.
                        <br/>The front end code can
                        be found <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/Eritz/sms-reminder-frontend"
                            style={{cursor:"pointer", color: "blue"}}>here.</a>
                    </p>
                </div>
            </div>
        );

    };
}

export default About;