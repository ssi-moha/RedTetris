import React, { Fragment } from 'react'

import { connect } from 'react-redux';

import RoomingFormContainer, {RoomingFormItem} from "../lib/RoomingForm/RoomingFormContainer";
import TextField from "../lib/Field/TextField";
import { errorMessage } from "../actions/errorMessage";
import { Dispatch } from "redux";
import {RouteComponentProps} from "react-router";

interface LoginProps {
    dispatch: Dispatch,
    socket: SocketIOClient.Socket,
}

type Values = { name: string };

const items: RoomingFormItem[] = [{
// @ts-ignore
    component: TextField,
    label: 'name',
    name: 'name',
}];

const onSubmit = (values: Values, dispatch: Dispatch, socket: SocketIOClient.Socket) => {
    if (values.name.match(/^[a-zA-Z0-9_.-]*$/g) === null)
    {
        dispatch(errorMessage('Only numbers, letters, _, ., -, are allowed'));
        return ;
    }
    socket.emit('userInputName',  { type: 'username', username: values.name });
};

const Login = (props: LoginProps & RouteComponentProps) => {
    console.log('props: ', props);
    return (
      <RoomingFormContainer
          title="Login"
          items={items}
          validateButton="Play !"
          onSubmit={values => onSubmit(values, props.dispatch, props.socket)}
      />
    );
};

const mapStateToProps = (state: any) => ({ errorMessage: state.errorMessage });


export default connect(mapStateToProps)(Login);
