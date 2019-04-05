import {SocketEmitFunctionType, SocketOnFunctionType} from "../types/Socket";

export const emitSocket: SocketEmitFunctionType = ({ socket, ioEvent, data }) => socket.emit(ioEvent, data);

export const socketEventListener: SocketOnFunctionType = ({ socket, ioEvent, cb }) => socket.on(ioEvent, cb)
