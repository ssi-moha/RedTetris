import React from "react";

import { connect } from "react-redux";

import {RouteComponentProps} from "react-router";
import { Dispatch } from "redux";
import { errorMessage } from "../actions/errorMessage";
import TextField from "../lib/Field/TextField";
import RoomingFormContainer, {RoomingFormItem} from "../lib/RoomingForm/RoomingFormContainer";

interface ILoginProps {
    dispatch: Dispatch;
    socket: SocketIOClient.Socket;
}

interface IValues { name: string; }

const items: RoomingFormItem[] = [{
// @ts-ignore
    component: TextField,
    label: "name",
    name: "name",
}];

const onSubmit = (values: IValues, dispatch: Dispatch, socket: SocketIOClient.Socket) => {
    if (values.name.match(/^[a-zA-Z0-9_.-]*$/g) === null) {
        dispatch(errorMessage("Only numbers, letters, _, ., -, are allowed"));
        return ;
    }
    socket.emit("userInputName",  { type: "username", username: values.name });
};

const Login = (props: ILoginProps & RouteComponentProps) => {
    console.log("props: ", props);
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
