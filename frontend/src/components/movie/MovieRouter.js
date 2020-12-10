import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './Home';

import MovieDetail from './MovieDetail';

export default function MovieRouter(props) {
    return (
        <Switch>
            <Route exact path={`${props.match.path}`} component={Home} />
            <Route exact path={`${props.match.path}movie/:id`} component={MovieDetail} />
            <Redirect to={`${props.match.path}`} />
        </Switch>
    )
}
