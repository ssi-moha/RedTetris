import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import socketIOClient from 'socket.io-client';
import {Button} from "semantic-ui-react";


const App = ({message}: {message: string}) => {
    const socket = socketIOClient('http://0.0.0.0:3004');
    socket.on('message', (message: string) => console.log('server message : ' + message));
    console.log('io: ', socket);
    return (
        <Fragment>
            <span>{message}</span>
            <br/>
            <Button content="Socket" onClick={() => socket.emit('message', 'client onclick func')} />
        </Fragment>
    )
};

const mapStateToProps = (state: any) => {
    return {
        message: state.message
    }
};

export default connect(mapStateToProps)(App);
