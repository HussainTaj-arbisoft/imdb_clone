import React, { Component } from 'react'

import { Switch, Route } from 'react-router-dom'
import AuthenticateUser from '../auth/AuthenticateUser'

import UserChat from './UserChat'
import UserList from './UserList'



export default class ChatRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={`${this.props.match.path}/users`}>
                    <AuthenticateUser>
                        <UserList />
                    </AuthenticateUser>
                </Route>
                <Route path={`${this.props.match.path}/user/:userId`}>
                    <AuthenticateUser>
                        <UserChat />
                    </AuthenticateUser>
                </Route>
            </Switch>
        )
    }
}