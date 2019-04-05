import { ERROR_MESSAGE } from "../actions/errorMessage"

interface IErrorMessageAction {
    type: string,
    errMessage?: string,
}

const errorMessage = (state = {} , action: IErrorMessageAction) => {
    switch (action.type) {
        case ERROR_MESSAGE:
            return { errMessage: action.errMessage };
        default:
            return state;
    };
};

export default errorMessage
