import React, {useState} from "react"

import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import Dashboard from "../components/Dashboard";
import {State} from "../types/State";
import {emitSocket} from "../sockets/action";
import {JOIN_ROOM} from "../../sockets/events";

interface IDashboardContainerProps extends RouteComponentProps {
    dispatch: Dispatch;
    socket: SocketIOClient.Socket;
}

const DashboardContainer = (props: IDashboardContainerProps & {rooms: State["rooms"]}) => {
    const [sidebarVisibility, handleSidebarVisibility] = useState(false);
    const [openCreateRoomDialog, handleOpenCreateRoomDialog] = useState(false);

    const joinRoom = (room: string) => {
        emitSocket<{ room: string }>({ socket: props.socket, ioEvent: JOIN_ROOM, data: { room } });
    }

    return (
        <Dashboard
            sidebarVisibility={sidebarVisibility}
            handleSidebarVisibility={handleSidebarVisibility}
            openCreateRoomDialog={openCreateRoomDialog}
            handleOpenCreateRoomDialog={handleOpenCreateRoomDialog}
            dispatch={props.dispatch}
            socket={props.socket}
            joinRoom={joinRoom}
            rooms={props.rooms}
        />
   );
};

const mapStateToProps = (state: State) => ({ rooms: state.rooms })

export default connect(mapStateToProps)(DashboardContainer);
