import React from "react";

import { Route, RouteComponentProps, Switch} from "react-router";

import Login from "./components/Login";

interface IRoutesProps {
    socket: SocketIOClient.Socket,
}

const Routes = (props: IRoutesProps) => {
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
