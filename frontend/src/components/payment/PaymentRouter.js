import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthenticateUser from "../auth/AuthenticateUser";
import Checkout from "./Checkout";

export default function MovieRouter(props) {
  return (
    <Switch>
      <Route exact path={`${props.match.path}/checkout/:movieId`}>
        <AuthenticateUser>
          <Checkout />
        </AuthenticateUser>
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}
