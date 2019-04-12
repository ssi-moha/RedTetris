import React, {Fragment} from "react";

import { connect } from "react-redux";
import { Router } from "react-router-dom";
import { Button } from "semantic-ui-react";
import socketIOClient from "socket.io-client";

import history from "../lib/history";
import Routes from "../Routes";
import {State} from "../types/State";

const App = (props: any) => {
    return (
        <Fragment>
            <span>{props.message}</span>
            <Router history={history}>
                <Routes socket={props.socket} user={props.user} />
            </Router>
        </Fragment>
    );
};

const mapStateToProps = (state: State) => ({ message: state.message, user: state.user });

export default connect(mapStateToProps)(App);
