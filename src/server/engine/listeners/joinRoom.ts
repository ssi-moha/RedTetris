import {Server} from "socket.io";
import {ISocketIOSocket} from "../../index";
import {loginfo} from "../../debug/debug";
import { ROOM_LIST, USER_JOINED_ROOM } from "../../../sockets/events";
import { find } from "lodash";

const joinRoom = (input: { room: string }, socket: ISocketIOSocket, ioEngine: Server) => {
    loginfo(find(ioEngine.sockets.adapter.rooms, (value, room) => room === input.room));
    socket.join(input.room);
    socket.emit(USER_JOINED_ROOM, {room: input.room});
}

export default joinRoom;
