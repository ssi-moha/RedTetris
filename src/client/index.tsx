import * as React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";

import socketIOClient from "socket.io-client";
import { alert } from "./actions/alert";
import App from "./containers/App";
import reducer from "./reducers";
import socketMiddleware from "./middleware/socketMiddleware";
import thunk from "redux-thunk";

const socket = socketIOClient("http://0.0.0.0:3004");

const initialState = {};
// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancer(applyMiddleware(thunk, socketMiddleware(socket)));

const store = createStore(
    reducer,
    initialState,
    enhancer,
);

ReactDOM.render((
    <Provider store={store}>
        <App socket={socket} />
    </Provider>
), document.getElementById("tetris"));

store.dispatch(alert("Soon, will be here a fantastic Tetris ..."))
