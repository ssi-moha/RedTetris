import { combineReducers } from "redux";

import alert from './alert'
import errorMessage from './errorMessage'

const redTetrisReducers = combineReducers({ alert, errorMessage })

export default redTetrisReducers;
