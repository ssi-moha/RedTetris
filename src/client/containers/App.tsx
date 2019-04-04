import React from "react";

import { connect } from "react-redux";
import { Router } from "react-router";
import { Button } from "semantic-ui-react";
import socketIOClient from "socket.io-client";

import history from "../lib/history";
import Routes from "../Routes";

const App = ({ message }: { message: string }) => {
    const socket = socketIOClient("http://0.0.0.0:3004");
    // socket.on('disconnect', () => socket.disconnect());
    socket.on("message", (socketMessage: string) => console.log(`server message : ${socketMessage}`));
    socket.on("action", (action: string) => console.log(`server action : `, action));
    console.log("io: ", socket);
    return (
        <Router history={history}>
            <span>{message}</span>
            <Button
                content="Socket"
                onClick={() => socket.emit("message", "client onclick func")}
            />
            <Button
                content="Action"
                onClick={() => socket.emit("action", {type: "server/ping", message: "client Action Func" } )}
            />
            <Routes socket={socket} />
        </Router>
    );
};

const mapStateToProps = (state: any) => ({ message: state.message });

export default connect(mapStateToProps)(App);
