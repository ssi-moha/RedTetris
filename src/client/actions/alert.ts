export const ALERT_POP = 'ALERT_POP'

export const alert = (message: string) => {
    return {
        type: ALERT_POP,
        message
    }
}
