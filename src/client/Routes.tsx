import React, { Fragment } from 'react'
import {RouterProps, Switch, Route, RouteComponentProps} from "react-router";
import Login from "./components/Login";

interface RoutesProps {
    socket: SocketIOClient.Socket,
}

const Routes = (props: RoutesProps) => {
  return (
      <Switch>
          <Route
              exact
              path="/"
              component={(routeProps: RouteComponentProps) => <Login socket={props.socket} {...routeProps}/>}
          />
      </Switch>
  );
};

export default Routes;
