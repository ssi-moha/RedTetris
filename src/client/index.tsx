import * as React from "react";
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from "react-redux";

import App from './containers/App';
import reducer from "./reducers";
import { alert } from './actions/alert';

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
), document.getElementById('tetris'));

store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))
