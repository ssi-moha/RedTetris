import React from "react";

import {Container, Grid, Icon, Menu, Sidebar, Modal} from "semantic-ui-react";

import Header from "./Header";
import {State} from "../types/State";
import VerticalSidebar from "./VerticalSidebar";
import RoomingFormContainer, {RoomingFormItem} from "../lib/RoomingForm/RoomingFormContainer";
import TextField from "../lib/Field/TextField";
import {emitSocket} from "../sockets/action";
import {CREATE_ROOM} from "../../sockets/events";
import {Dispatch} from "redux";

const divTriggerSidebarStyle: React.CSSProperties = {
    float: "left",
    height: "100%",
    width: "10%",
};

const fullHeight: React.CSSProperties = { height: "100%" };

const game = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

interface IDashboardProps {
    handleSidebarVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    sidebarVisibility: boolean,
    handleOpenCreateRoomDialog: React.Dispatch<React.SetStateAction<boolean>>,
    openCreateRoomDialog: boolean,
    dispatch: Dispatch,
    rooms: string[],
    socket: SocketIOClient.Socket,
}

const formItems: RoomingFormItem[] = [{
    // @ts-ignore
    component: TextField,
    label: "newRoom",
    name: "room",
}]

const onSubmit = (values: { room: string }, socket: SocketIOClient.Socket, dispatch: Dispatch) => {
    emitSocket<{ room: string }>({ socket, ioEvent: CREATE_ROOM, data: { room: values.room }})
}

const Dashboard = (props: IDashboardProps) => {
    return (
        <Container style={fullHeight} fluid>
            <Header/>
            <div
                onMouseEnter={() => props.handleSidebarVisibility(true)}
                onMouseLeave={() => props.handleSidebarVisibility(false)}
                style={divTriggerSidebarStyle}
            />
            <VerticalSidebar
                handleOpenCreateRoomDialog={props.handleOpenCreateRoomDialog}
                openCreateRoomDialog={props.openCreateRoomDialog}
                rooms={props.rooms}
                visibility
            />
            <Grid textAlign="center" celled container stackable columns={10} >
                {game.map((row, index) => {
                    return (
                        <Grid.Row key={index}>
                            {
                                row.map((cell, cellIndex) => <Grid.Column key={cellIndex}>O</Grid.Column>)
                            }
                        </Grid.Row>
                    )
                })}
            </Grid>
            <Modal open={props.openCreateRoomDialog}>
                <Modal.Header>Create a room</Modal.Header>
                <Modal.Content>
                <RoomingFormContainer
                    onSubmit={(values) => onSubmit(values, props.socket, props.dispatch)}
                    items={formItems}
                    validateButton="Create"
                    cancelButton="Cancel"
                    cancelFunction={() => props.handleOpenCreateRoomDialog(false)}
                />
                </Modal.Content>
            </Modal>
        </Container>
    );
};

export default Dashboard;
