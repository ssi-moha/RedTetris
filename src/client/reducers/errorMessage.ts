import { ERROR_MESSAGE } from '../actions/errorMessage'

interface ErrorMessageAction {
    type: string,
    errMessage?: string,
}

const errorMessage = (state = {} , action: ErrorMessageAction) => {
    switch(action.type) {
        case ERROR_MESSAGE:
            return { errMessage: action.errMessage };
        default:
            return state;
    };
};

export default errorMessage
