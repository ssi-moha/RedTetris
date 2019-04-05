import {ISocketEmitMethodArgs, ISocketOnMethodArgs} from "./Login";

export type SocketEmitFunctionType = <DataType>(args: ISocketEmitMethodArgs<DataType>) => void;

export type SocketOnFunctionType = <DataType>(args: ISocketOnMethodArgs<DataType>) => void;
