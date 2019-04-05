export const ALERT_POP = "ALERT_POP";

export const alert = (message: string) => {
    return {
        message,
        type: ALERT_POP,
    }
};
