import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SignIn from './SignIn';
import SignUp from './SignUp';


export default class Authentication extends Component {
    render() {
        return (
            <div>
                <Route
                    path={`${this.props.match.path}/signin`}
                    component={SignIn} />
                <Route
                    path={`${this.props.match.path}/signup`}
                    component={SignUp} />
            </div>
        )
    }
}