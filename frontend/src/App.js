import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Home from './components/home/Home';
import Authentication from './components/auth/Authentication';
import * as authActions from './store/actions/authActions'

import React, { Component } from 'react'

class App extends Component {
  componentDidMount() {
    this.props.signInWithTokenCookieIfExists();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/auth" component={Authentication} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const appActions = ({
  signInWithTokenCookieIfExists: authActions.signInWithTokenCookieIfExists,
});

export default connect(null, appActions)(App);