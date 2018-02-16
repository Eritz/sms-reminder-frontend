import React, {Component} from 'react';
import './About.css';

class About extends Component {
    render() {
        return (
            <div className="About">
                <div>
                    <h1>What is this?</h1>
                    <p>
                        This web app will send free SMS reminders using Twilio's API. Registration is not required <br/>
                        but registering will allow tracking all sent notifications. Standard SMS fees and pricing <br/>
                        related information applies when using this service. 
                    </p>
                </div>
            </div>
        );

    };
}

export default About;