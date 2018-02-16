import React from 'react';

const sent = (props) => {
    return(
        <div>
            <h1>Submitted</h1>
            <p>Congratulations! You sent a message!</p>
            <p>Want to send more? Click <span onClick={props.goBack} style={{color: "blue", cursor: "pointer"}}>
            here</span> to go back.</p>
        </div>
    );
}

export default sent;