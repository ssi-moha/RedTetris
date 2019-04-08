import React, {Fragment, useState} from "react"

import {Dispatch} from "redux";
import {Button, Container, Menu, Sidebar} from "semantic-ui-react";
import {connect} from "react-redux";

import Icon from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";
import {sidebarVisibility} from "../actions/sidebarVisibility";
import Header from "../components/Header";
import {State} from "../types/State";

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
    width: "5%",
};

const fullHeight = { height: "100%" };

const handleSidebarVisibility = (dispatch: Dispatch, visibility: boolean) => dispatch(sidebarVisibility(!visibility))

const Dashboard = (props) => {
    return (
        <Container style={fullHeight} fluid>
            <Header/>
            <div
                onMouseEnter={() => handleSidebarVisibility(props.dispatch, props.sidebarVisibility)}
                onMouseLeave={() => handleSidebarVisibility(props.dispatch, props.sidebarVisibility)}
                style={divTriggerSidebarStyle}
            />
            <VerticalSidebar visibility={props.sidebarVisibility} />
        </Container>
    );
};

const mapStateToProps = (state: State) => ({ sidebarVisibility: state.sidebarVisibility });

export default connect(mapStateToProps)(Dashboard);
