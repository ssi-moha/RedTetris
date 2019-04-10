import { combineReducers } from "redux";

import errorMessage from "./errorMessage";
import rooms from "./rooms";
import sidebarVisibility from "./sidebarVisibility";
import user from "./user";

const redTetrisReducers = combineReducers({ errorMessage, user, sidebarVisibility , rooms })

export default redTetrisReducers;
