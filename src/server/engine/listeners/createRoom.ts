import {Server} from "socket.io";

import {ISocketIOSocket} from "../../index";
import {loginfo} from "../../debug/debug";
import {find} from "lodash";
import {ROOM_LIST} from "../../../sockets/events";

interface ICreateRoomArgs {
    room: string,
}

const createRoom = (input: ICreateRoomArgs, socket: ISocketIOSocket, ioEngine: Server) => {
    loginfo(find(ioEngine.sockets.adapter.rooms, (value, room) => room === input.room));
    socket.join(input.room);
    ioEngine.emit(ROOM_LIST, {rooms: ioEngine.sockets.adapter.rooms});
}

export default createRoom;
