import { Server } from "socket.io";

import {loginfo} from "../debug/debug";
import { ISocketIOSocket } from "../index";
import userInputNameListener from "./listeners/userInputName";
import {GET_ROOMS, ROOM_LIST} from "../../sockets/events";

const engine = (socket: ISocketIOSocket, ioEngine: Server) => {
    loginfo(`Socket connected: ${socket.id}`);
    socket.emit("message", "Connected successfully");

    socket.on("userInputName", (input) => userInputNameListener(input, socket, ioEngine));
    socket.broadcast.emit(ROOM_LIST, {rooms: ioEngine.sockets.adapter.rooms})
};

export default engine;
