import {forEach} from "lodash";
import {Dispatch} from "redux";
import * as SocketIO from "socket.io";

import {LOGIN_ATTEMPT, ROOM_LIST, USER_JOINED_ROOM} from "../../sockets/events";
import {rooms as roomsAction} from "../actions/rooms";
import {user} from "../actions/user";
import {socketEventListener} from "../sockets/action";
import {ISocketOnMethodCb, IUserData} from "../types/Login";
import {State} from "../types/State";

interface IStoreAttributes {
    getState: () => State,
    dispatch: Dispatch,
}

const loginAttemptEventCb: ISocketOnMethodCb<IUserData> = (data, dispatch) => dispatch(user(data.user));

const handleRoomsObject = (rooms: SocketIO.Rooms, dispatch: Dispatch) => {
    let first = 0;
    const roomList: string[] = [];
    forEach(rooms.rooms, (room, index) => {
        first++;
        roomList.push(index);
    });
    dispatch(roomsAction(roomList));
    return roomList;
}

const changeUserRoom: ISocketOnMethodCb<{ room: string }> = (data, { dispatch, username }) => {
    console.log('username: ', username);
    dispatch(user({
        room: data.room,
        username,
    }))
}

const socketMiddleware = (socket: SocketIOClient.Socket) => ({ getState, dispatch }: IStoreAttributes) => {
    socketEventListener({ ioEvent: "message", socket, cb: (data) => console.log("message: ", data) });

    socketEventListener<IUserData>({
        cb: (data) => loginAttemptEventCb(data, dispatch),
        ioEvent: LOGIN_ATTEMPT,
        socket,
    });

    socketEventListener<SocketIO.Rooms>({
        cb: (data) => handleRoomsObject(data, dispatch),
        ioEvent: ROOM_LIST,
        socket,
    });

    socketEventListener<{ room: string }>({
        cb: (data) => changeUserRoom(data, { dispatch, username: getState().user.username }),
        ioEvent: USER_JOINED_ROOM,
        socket,
    });

    return next => action => next(action);
};

export default socketMiddleware;
