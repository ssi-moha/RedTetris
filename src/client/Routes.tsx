import React from "react";

import { Route, RouteComponentProps, Switch} from "react-router";

import Login from "./components/Login";
import DashboardContainer from "./containers/DashboardContainer";
import history from "./lib/history";
import {IUser} from "./types/State";

interface IRoutesProps {
    socket: SocketIOClient.Socket,
    user: IUser,
}

const isLogged = (user: IUser) => user && history.push(`#${user.room}[${user.username}]`);

const Routes = (props: IRoutesProps) => {

    isLogged(props.user);
    const componentToRender = (routeProps: RouteComponentProps) => props.user ?
        <DashboardContainer socket={props.socket} {...routeProps} /> : <Login socket={props.socket} {...routeProps}/>;

    return (
      <Switch>
          <Route
              path="/"
              component={componentToRender}
          />
      </Switch>
  );
};

export default Routes;
