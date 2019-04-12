import { Server } from "socket.io";

import {loginfo} from "../debug/debug";
import { ISocketIOSocket } from "../index";
import userInputNameListener from "./listeners/userInputName";
import {CREATE_ROOM, GET_ROOMS, JOIN_ROOM, ROOM_LIST} from "../../sockets/events";
import createRoom from "./listeners/createRoom";
import joinRoom from "./listeners/joinRoom";

const engine = (socket: ISocketIOSocket, ioEngine: Server) => {
    loginfo(`Socket connected: ${socket.id}`);
    socket.emit("message", "Connected successfully");

    socket.on("userInputName", (input) => userInputNameListener(input, socket, ioEngine));
    socket.on(CREATE_ROOM, (input) => createRoom(input, socket, ioEngine))
    socket.on(JOIN_ROOM, (input) => joinRoom(input, socket, ioEngine));
};

export default engine;
