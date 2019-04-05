import * as React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";

import { alert } from "./actions/alert";
import App from "./containers/App";
import reducer from "./reducers";

const initialState = {};
const store = createStore(
    reducer,
    initialState,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById("tetris"));

store.dispatch(alert("Soon, will be here a fantastic Tetris ..."))
