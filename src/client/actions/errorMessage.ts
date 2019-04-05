export const ERROR_MESSAGE = "ERROR_MESSAGE";

export const errorMessage = (errMessage: string) => {
    return {
        errMessage,
        type: ERROR_MESSAGE,
    };
};
