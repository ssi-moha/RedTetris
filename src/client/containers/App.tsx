import React from "react";

import { connect } from "react-redux";
import { Router} from "react-router-dom";
import { Button } from "semantic-ui-react";
import socketIOClient from "socket.io-client";

import history from "../lib/history";
import Routes from "../Routes";

const socket = socketIOClient("http://0.0.0.0:3004");

const App = (props: any) => {
    console.log("render");
    console.log("user: ", props.user);
    socket.on("message", (socketMessage: string) => console.log(`server message : ${socketMessage}`));
    return (
        <Router history={history}>
            <span>{props.message}</span>
            <Routes socket={socket} />
        </Router>
    );
};

const mapStateToProps = (state: any) => ({ message: state.message, user: state.user });

export default connect(mapStateToProps)(App);
