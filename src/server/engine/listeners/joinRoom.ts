import { find } from "lodash";
import {Server} from "socket.io";
import { ROOM_LIST, USER_JOINED_ROOM } from "../../../sockets/events";
import {loginfo} from "../../debug/debug";
import {ISocketIOSocket} from "../../index";

const joinRoom = (input: { room: string }, socket: ISocketIOSocket, ioEngine: Server) => {
    console.log("room: ", input.room);
    socket.join(input.room);
    socket.emit(USER_JOINED_ROOM, {room: input.room});
}

export default joinRoom;
