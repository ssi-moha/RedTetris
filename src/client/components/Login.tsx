import React from "react";

import { connect } from "react-redux";

import {RouteComponentProps} from "react-router";
import { Dispatch } from "redux";

import { Hash } from "history";
import { LOGIN_ATTEMPT } from "../../sockets/events";
import { errorMessage } from "../actions/errorMessage";
import { user } from "../actions/user";
import TextField from "../lib/Field/TextField";
import RoomingFormContainer, {RoomingFormItem} from "../lib/RoomingForm/RoomingFormContainer";
import {emitSocket, socketEventListener} from "../sockets/action";
import {
    ILoginProps,
    IUserInfo,
    IValues,
} from "../types/Login";

const items: RoomingFormItem[] = [
    {
        // @ts-ignore
        component: TextField,
        label: "Name",
        name: "name",
    },
    {
        // @ts-ignore
        component: TextField,
        label: "Room",
        name: "room",
    },

];

const connectUser = (values: IValues, dispatch: Dispatch, socket: SocketIOClient.Socket) => {
    if (values.name.match(/^[a-zA-Z0-9_.-]*$/g) === null) {
        dispatch(errorMessage("Only numbers, letters, _, ., -, are allowed"));
        return ;
    }
    const userInfo = { username: values.name, room: values.room || `${values.name}Room` };
    emitSocket<IUserInfo>({ socket, ioEvent: "userInputName", data: userInfo });
};

const getUserInfoFromUrl = (hash: Hash) => hash.match(/#([^[]+)\[([^\]]+)\]/);

const Login = (props: ILoginProps & RouteComponentProps) => {
    if (props.location && props.location.hash) {
        // @ts-ignore
        const [_, room, name] = getUserInfoFromUrl(props.location.hash);
        connectUser({ name, room }, props.dispatch, props.socket)
    }

    return (
      <RoomingFormContainer
          title="Login"
          items={items}
          validateButton="Play !"
          onSubmit={(values) => connectUser(values, props.dispatch, props.socket)}
      />
    );
};

const mapStateToProps = (state: any) => ({ errorMessage: state.errorMessage });

export default connect(mapStateToProps)(Login);
