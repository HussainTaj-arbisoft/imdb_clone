import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react'


import './App.css';
import AuthRouter from './components/auth/AuthRouter';
import * as authActions from './store/actions/authActions'

import MovieRouter from './components/movie/MovieRouter';

class App extends Component {
  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.signInWithTokenCookieIfExists();
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/auth" component={AuthRouter} />
            <Route path="/" component={MovieRouter} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const appActions = ({
  signInWithTokenCookieIfExists: authActions.signInWithTokenCookieIfExists,
});

export default connect(mapStateToProps, appActions)(App);