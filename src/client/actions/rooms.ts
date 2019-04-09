export const ROOM_LIST = "ROOM_LIST";

export const rooms = (roomList: string[]) => {
    return {
        rooms: roomList,
        type: ROOM_LIST,
    }
};
