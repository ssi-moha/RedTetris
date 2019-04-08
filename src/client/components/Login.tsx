import React from "react";

import { connect } from "react-redux";

import {RouteComponentProps} from "react-router";
import { Dispatch } from "redux";

import {fromJS} from "immutable";
import { LOGIN_ATTEMPT } from "../../sockets/events";
import { errorMessage } from "../actions/errorMessage";
import {user} from "../actions/user";
import TextField from "../lib/Field/TextField";
import RoomingFormContainer, {RoomingFormItem} from "../lib/RoomingForm/RoomingFormContainer";
import {emitSocket, socketEventListener} from "../sockets/action";
import {
    ILoginProps,
    ISocketMethodArgs,
    ISocketOnMethodArgs,
    ISocketOnMethodCb,
    IUserData,
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

const onSubmit = (values: IValues, dispatch: Dispatch, socket: SocketIOClient.Socket) => {
    if (values.name.match(/^[a-zA-Z0-9_.-]*$/g) === null) {
        dispatch(errorMessage("Only numbers, letters, _, ., -, are allowed"));
        return ;
    }
    const userInfo = { username: values.name, room: values.room || `${values.name}Room` };
    emitSocket<IUserInfo>({ socket, ioEvent: "userInputName", data: userInfo });
};

const loginAttemptEventCb: ISocketOnMethodCb<IUserData> = (data, dispatch) => {
    console.log("data: ", data);
    console.log("dispatch: ", dispatch);
    dispatch(user(data.user));
}

const Login = (props: ILoginProps & RouteComponentProps) => {
    const listenerArgs: ISocketOnMethodArgs<IUserData> = {
        cb: (data) => loginAttemptEventCb(data, props.dispatch),
        ioEvent: LOGIN_ATTEMPT,
        socket: props.socket,
    };

    socketEventListener<IUserData>(listenerArgs);

    return (
      <RoomingFormContainer
          title="Login"
          items={items}
          validateButton="Play !"
          onSubmit={(values) => onSubmit(values, props.dispatch, props.socket)}
      />
    );
};

const mapStateToProps = (state: any) => ({ errorMessage: state.errorMessage });

export default connect(mapStateToProps)(Login);
