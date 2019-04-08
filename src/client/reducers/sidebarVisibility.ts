import {SIDEBAR_VISIBILITY} from "../actions/sidebarVisibility";

interface ISidebarVisibility {
    type: string,
    sidebarVisibility: boolean,
}

const sidebarVisibility = (state: boolean = false, action: ISidebarVisibility) => {
    switch (action.type) {
        case SIDEBAR_VISIBILITY:
            return action.sidebarVisibility;
        default:
            return state;
    }
}

export default sidebarVisibility;
