import { ALERT_POP } from '../actions/alert'

interface AlertAction {
    type: string,
    message?: string,
}

const alert = (state = {} , action: AlertAction) => {
    switch(action.type){
        case ALERT_POP:
            return { message: action.message }
        default:
            return state
    }
}

export default alert
