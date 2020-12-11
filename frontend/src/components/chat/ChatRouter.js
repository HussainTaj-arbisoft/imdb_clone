import React, { Component } from 'react'

import { Switch, Route } from 'react-router-dom'

import UserChat from './UserChat'
import UserList from './UserList'



export default class ChatRouter extends Component {
    render() {
        return (
            <Switch>
                <Route
                    exact path={`${this.props.match.path}/users`}
                    component={UserList} />
                <Route
                    path={`${this.props.match.path}/user/:id`}
                    component={UserChat} />
            </Switch>
        )
    }
}