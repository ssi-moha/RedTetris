import { combineReducers } from "redux";

import errorMessage from "./errorMessage";
import rooms from "./rooms";
import sidebarVisibility from "./sidebarVisibility";
import user from "./user";
import tetris from "./tetris";

const redTetrisReducers = combineReducers({
    errorMessage,
    user,
    sidebarVisibility,
    rooms,
    tetris,
})

export default redTetrisReducers;
