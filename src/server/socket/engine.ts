import { find, forEach, includes, map } from "lodash";
import {Namespace, Server, Socket} from "socket.io";
import {loginfo} from "../debug/debug";
import { ISocketIOSocket } from "../index";

const findSocketSessionVariable = (sockets: any, attributeToFind: string): any[] =>
    map(sockets, (elem) => elem[attributeToFind])

const engine = (socket: ISocketIOSocket, ioEngine: Server) => {
    loginfo(`Socket connected: ${socket.id}`);
    socket.emit("message", "Connected successfully");

    socket.on("message", (message) => loginfo(`message from client: ${message}`));

    socket.on("userInputName", (input) => {
        loginfo(`username from client: ${input.username}`)
        loginfo("username: "
            + findSocketSessionVariable(ioEngine.sockets.sockets, "username").includes(input.username))
        socket.username = input.username;
        // @ts-ignore
        loginfo("username: "
            + findSocketSessionVariable(ioEngine.sockets.sockets, "username").includes(input.username))
    });
    socket.on("action", (action) => {
        if (action.type === "server/ping") {
            loginfo(`action from client: message = ${action.message}`)

            socket.emit("action", { type: "pong" });
        }
    });
}

export default engine;
