
export interface IUser {
    username: string,
    room: string,
}

export interface IMessage {
    message: string,
}

export interface IRooms {
    rooms: string[],
}

export type State = { user: IUser } & IMessage & IRooms;
