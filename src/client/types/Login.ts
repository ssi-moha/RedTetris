import {Dispatch} from "redux";

export interface ILoginProps {
    dispatch: Dispatch;
    socket: SocketIOClient.Socket;
}

export interface IValues {
    name: string,
    room?: string,
}

export interface IUserInfo {
        username: string,
        room: string,
}

export interface IUserData {
    error: boolean,
    user: IUserInfo
}

export interface ISocketMethodArgs {
    socket: SocketIOClient.Socket,
    ioEvent: string,
};

export interface ISocketEmitMethodArgs<DataType> extends ISocketMethodArgs {
    data?: DataType,
}

export type ISocketOnMethodCb<DataType> = (data: DataType, _?: any) => any;

export interface ISocketOnMethodArgs<DataType> extends ISocketMethodArgs {
    cb: ISocketOnMethodCb<DataType>,
}
