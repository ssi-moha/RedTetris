import {USER_LOGIN} from "../actions/user";

interface IUserLogging {
    type: string,
    user: {},
}

const user = (state = null, action: IUserLogging) => {
    switch (action.type) {
        case USER_LOGIN:
            return { ...action.user };
        default:
            return state;
    }
};

export default user;
