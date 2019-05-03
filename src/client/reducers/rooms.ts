import {ROOM_LIST} from "../actions/rooms";

interface IRoomList {
    type: string,
    rooms: string[],
};

const rooms = (state: {} | [] = [], action: IRoomList) => {
    switch (action.type) {
        case ROOM_LIST:
            return action.rooms;
        default:
            return state;
    }
}

export default rooms;
