import {Server} from "socket.io";

import {find} from "lodash";
import {ROOM_LIST} from "../../../sockets/events";
import {loginfo} from "../../debug/debug";
import {ISocketIOSocket} from "../../index";
import roomList from "../../roomList";
import joinRoom from "./joinRoom";

interface ICreateRoomArgs {
    room: string,
}

const createRoom = (input: ICreateRoomArgs, socket: ISocketIOSocket, ioEngine: Server) => {
    loginfo(find(ioEngine.sockets.adapter.rooms, (value, room) => room === input.room));
    joinRoom(input, socket, ioEngine);
    if (!roomList.includes(input.room)) {
        roomList.push(input.room);
    }
    ioEngine.emit(ROOM_LIST, roomList);
}

export default createRoom;
