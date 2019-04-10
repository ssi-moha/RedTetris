import React from "react";

import {map} from "lodash";
import {Icon, Sidebar} from "semantic-ui-react";
import { Menu } from "semantic-ui-react";

interface IVerticalSidebarProps {
    handleOpenCreateRoomDialog: React.Dispatch<React.SetStateAction<boolean>>,
    openCreateRoomDialog: boolean,
    visibility: boolean,
    rooms: string[],
}

const VerticalSidebar = (props: IVerticalSidebarProps) => {
    return (<Sidebar
            as={Menu}
            animation="overlay"
            direction="left"
            icon="labeled"
            inverted
            vertical
            visible={props.visibility}
            width="thin"
        >
            <Menu.Item onClick={() => props.handleOpenCreateRoomDialog(!props.openCreateRoomDialog)}>
                <Icon name="plus circle"/> <p>Create a room</p>
            </Menu.Item>
            {map(props.rooms, (room, index) => <Menu.Item content={room} key={index}/> )}
        </Sidebar>
    )
};

export default VerticalSidebar;
