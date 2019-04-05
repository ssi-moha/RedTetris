export const USER_LOGIN = "USER_LOGIN";

export const user = (userToLog: any) => {
    return {
        type: USER_LOGIN,
        user: userToLog,
    }
}
