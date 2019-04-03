import * as React from "react";
import ReactDOM from 'react-dom';
import App from './containers/App';
import { createStore } from 'redux';
import reducer from "./reducers";
import { Provider } from "react-redux";
import { alert } from './actions/alert';

const initialState = {};

const store = createStore(
    reducer,
    initialState,
);

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('tetris'));

store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))
