import { ALERT_POP } from "../actions/alert"

interface IAlertAction {
    type: string,
    message?: string,
}

const alert = (state = {} , action: IAlertAction) => {
    switch (action.type){
        case ALERT_POP:
            return { message: action.message }
        default:
            return state
    }
}

export default alert
