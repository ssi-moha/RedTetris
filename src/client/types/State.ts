
export interface IUser {
    username: string,
    room: string,
}

export interface IMessage {
    message: string,
}

export type State = { user: IUser } & IMessage;
