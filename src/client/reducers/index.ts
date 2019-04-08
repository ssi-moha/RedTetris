import { combineReducers } from "redux";

import alert from "./alert";
import errorMessage from "./errorMessage";
import sidebarVisibility from "./sidebarVisibility";
import user from "./user";

const redTetrisReducers = combineReducers({ alert, errorMessage, user, sidebarVisibility })

export default redTetrisReducers;
