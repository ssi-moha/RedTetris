import { combineReducers } from "redux";

import alert from "./alert";
import errorMessage from "./errorMessage";
import user from "./user";

const redTetrisReducers = combineReducers({ alert, errorMessage, user })

export default redTetrisReducers;
