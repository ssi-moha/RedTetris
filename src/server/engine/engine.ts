import { Server } from "socket.io";

import {loginfo} from "../debug/debug";
import { ISocketIOSocket } from "../index";
import userInputNameListener from "./listeners/userInputName";

const engine = (socket: ISocketIOSocket, ioEngine: Server) => {
    loginfo(`Socket connected: ${socket.id}`);
    socket.emit("message", "Connected successfully");

    socket.on("userInputName", (input) => userInputNameListener(input, socket, ioEngine));
};

export default engine;