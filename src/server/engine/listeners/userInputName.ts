import { map } from "lodash";
import { Server } from "socket.io";

import {LOGIN_ATTEMPT, ROOM_LIST} from "../../../sockets/events";
import { loginfo } from "../../debug/debug";
import { ISocketIOSocket } from "../../index";
import { IUserInputNameArgs } from "./ListenerArgsTypes";
import roomList from "../../roomList";

const findSocketSessionVariables = (sockets: {}, attributeToFind: string): any[] =>
    map(sockets, (elem) => elem[attributeToFind]);

const userInputNameListener = (input: IUserInputNameArgs, socket: ISocketIOSocket, ioEngine: Server) => {
    if (findSocketSessionVariables(ioEngine.sockets.sockets, "username").includes(input.username)) {
        loginfo(`username ${input.username} already exist on another session`);
        socket.emit(LOGIN_ATTEMPT, { error: true, message: "Username already used" });
    }
    else {
        const room = input.room || `${input.username}room`;
        const infoToEmit = {
            error: false,
            user: {
                room,
                username: input.username,
            },
        };
        socket.username = input.username;
        socket.join(room);
        if (!roomList.includes(input.room)) {
            roomList.push(input.room);
        }
        socket.emit(LOGIN_ATTEMPT, infoToEmit);
        ioEngine.emit(ROOM_LIST, roomList)
        loginfo(`username ${input.username} successfully joined ${room}`)
    }
}

export default userInputNameListener;
