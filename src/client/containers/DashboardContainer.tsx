import React, {useState} from "react"

import Dashboard from "../components/Dashboard";
import {emitSocket, socketEventListener} from "../sockets/action";
import {Dispatch} from "redux";
import {RouteComponentProps} from "react-router";
import {GET_ROOMS, ROOM_LIST} from "../../sockets/events";
import * as SocketIO from "socket.io";
import {map, forEach} from "lodash";
import {rooms as roomsAction} from "../actions/rooms";
import {connect} from "react-redux";
import {State} from "../types/State";
import {fromJS} from "immutable";

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
    })
    dispatchRoomList(roomList, dispatch);
    return roomList;
}

const DashboardContainer = (props: IDashboardContainerProps) => {
    const [sidebarVisibility, handleSidebarVisibility] = useState(false);
    console.log("props: ", props);
    socketEventListener<SocketIO.Rooms>({ socket: props.socket, ioEvent: ROOM_LIST, cb: (data) => handleRoomsObject(data, props.dispatch)})
    return (
        <Dashboard sidebarVisibility={sidebarVisibility} handleSidebarVisibility={handleSidebarVisibility}/>
    );
};

const mapStateToProps = (state: State) => ({ rooms: state.rooms })

export default connect()(DashboardContainer);
