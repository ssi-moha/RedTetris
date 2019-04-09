import React from "react";

import {Container, Grid, Icon, Menu, Sidebar} from "semantic-ui-react";

import Header from "./Header";

const VerticalSidebar = ({ visibility }: { visibility: boolean}) => {
    return (<Sidebar
            as={Menu}
            animation="overlay"
            direction="left"
            icon="labeled"
            inverted
            vertical
            visible={visibility}
            width="thin"
        >
            <Menu.Item as="a">
                <Icon name="home" />
                Home
            </Menu.Item>
            <Menu.Item as="a">
                <Icon name="gamepad" />
                Games
            </Menu.Item>
            <Menu.Item as="a">
                <Icon name="camera" />
                Channels
            </Menu.Item>
        </Sidebar>
    )
}

const divTriggerSidebarStyle: React.CSSProperties = {
    float: "left",
    height: "100%",
    width: "10%",
};

const fullHeight = { height: "100%" };

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
]

const Dashboard = (props) => {
    return (
        <Container style={fullHeight} fluid>
            <Header/>
            <div
                onMouseEnter={() => props.handleSidebarVisibility(true)}
                onMouseLeave={() => props.handleSidebarVisibility(false)}
                style={divTriggerSidebarStyle}
            />
            <VerticalSidebar visibility />
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
        </Container>
    );
};

export default Dashboard;
