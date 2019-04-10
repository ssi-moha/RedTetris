import React, {useState} from "react"

import { forEach } from "lodash";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import * as SocketIO from "socket.io";
import { ROOM_LIST } from "../../sockets/events";
import {rooms as roomsAction} from "../actions/rooms";
import Dashboard from "../components/Dashboard";
import { socketEventListener } from "../sockets/action";
import {State} from "../types/State";

interface IDashboardContainerProps extends RouteComponentProps {
    dispatch: Dispatch;
    socket: SocketIOClient.Socket;
}

const dispatchRoomList = (roomList: string[], dispatch: Dispatch) => dispatch(roomsAction(roomList));

const handleRoomsObject = (rooms: SocketIO.Rooms, dispatch: Dispatch) => {
    let first = 0;
    const roomList: string[] = [];
    forEach(rooms.rooms, (room, index) => {
        first++;
        if (first % 2 === 0)
        {
            roomList.push(index);
        }
    });
    dispatchRoomList(roomList, dispatch);
    return roomList;
}

const DashboardContainer = (props: IDashboardContainerProps & {rooms: State["rooms"]}) => {
    const [sidebarVisibility, handleSidebarVisibility] = useState(false);
    const [openCreateRoomDialog, handleOpenCreateRoomDialog] = useState(false);
    socketEventListener<SocketIO.Rooms>({
        cb: (data) => handleRoomsObject(data, props.dispatch),
        ioEvent: ROOM_LIST,
        socket: props.socket,
    });
    return (
        <Dashboard
            sidebarVisibility={sidebarVisibility}
            handleSidebarVisibility={handleSidebarVisibility}
            openCreateRoomDialog={openCreateRoomDialog}
            handleOpenCreateRoomDialog={handleOpenCreateRoomDialog}
            rooms={props.rooms}
        />
   );
};

const mapStateToProps = (state: State) => ({ rooms: state.rooms })

export default connect(mapStateToProps)(DashboardContainer);
