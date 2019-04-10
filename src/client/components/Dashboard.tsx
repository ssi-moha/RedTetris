import React from "react";

import {Container, Grid, Icon, Menu, Sidebar, Modal} from "semantic-ui-react";

import Header from "./Header";
import {State} from "../types/State";
import VerticalSidebar from "./VerticalSidebar";
import RoomingFormContainer, {RoomingFormItem} from "../lib/RoomingForm/RoomingFormContainer";
import TextField from "../lib/Field/TextField";

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
    rooms: string[],
}

const formItems: RoomingFormItem[] = [{
    // @ts-ignore
    component: TextField,
    label: "newRoom",
    name: "room",
}]

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
                    onSubmit={console.log}
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
