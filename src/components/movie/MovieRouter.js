import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AuthenticateUser from "../auth/AuthenticateUser";
import Home from "./Home";
import MovieDetail from "./MovieDetail";
import OwnedMovies from "./OwnedMovies";
import WishList from "./WishList";

export default function MovieRouter(props) {
  return (
    <Switch>
      <Route exact path={`${props.match.path}`} component={Home} />
      <Route exact path={`${props.match.path}movie/wishlist`}>
        <AuthenticateUser>
          <WishList />
        </AuthenticateUser>
      </Route>
      <Route exact path={`${props.match.path}movie/owned`}>
        <AuthenticateUser>
          <OwnedMovies />
        </AuthenticateUser>
      </Route>
      <Route
        exact
        path={`${props.match.path}movie/:id`}
        component={MovieDetail}
      />
      <Redirect to={`${props.match.path}`} />
    </Switch>
  );
}
