import React from 'react'

import { connect } from 'react-redux'
import socketIOClient from 'socket.io-client';
import { Router } from "react-router";
import { Button } from "semantic-ui-react";

import history from "../lib/history";
import Routes from "../Routes";


const App = ({ message }: { message: string }) => {
    const socket = socketIOClient('http://0.0.0.0:3004');
    socket.on('message', (message: string) => console.log(`server message : ${message}`));
    socket.on('action', (action: string) => console.log(`server action : `, action));
    console.log('io: ', socket);
    return (
        <Router history={history} >
            <span>{message}</span>
            <Button content="Socket" onClick={() => socket.emit('message', 'client onclick func')} />
            <Button
                content="Action"
                onClick={() => socket.emit('action', {type: 'server/ping', message: 'client Action Func' } )}
            />
            <Routes />
        </Router>
    )
};

const mapStateToProps = (state: any) => {
    return {
        message: state.message
    }
};

export default connect(mapStateToProps)(App);
