import { combineReducers } from "redux";

import alert from "./alert";
import errorMessage from "./errorMessage";
import rooms from "./rooms";
import sidebarVisibility from "./sidebarVisibility";
import user from "./user";

const redTetrisReducers = combineReducers({ alert, errorMessage, user, sidebarVisibility , rooms})

export default redTetrisReducers;
