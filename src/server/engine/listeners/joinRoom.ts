import {Server} from "socket.io";
import {ISocketIOSocket} from "../../index";
import {loginfo} from "../../debug/debug";
import { ROOM_LIST, USER_JOINED_ROOM } from "../../../sockets/events";
import { find } from "lodash";

interface IJoinRoomArgs {
    room: string,
}

const joinRoom = (input: IJoinRoomArgs, socket: ISocketIOSocket, ioEngine: Server) => {
    loginfo(find(ioEngine.sockets.adapter.rooms, (value, room) => room === input.room));
    loginfo('joinRoom');
    socket.join(input.room);
    socket.emit(USER_JOINED_ROOM, {room: input.room});
}

export default joinRoom;
