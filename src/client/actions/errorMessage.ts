export const ERROR_MESSAGE = 'ERROR_MESSAGE';

export const errorMessage = (errMessage: string) => {
    return {
        type: ERROR_MESSAGE,
        errMessage
    };
};
