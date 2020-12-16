import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";

import "./App.css";
import AuthRouter from "./components/auth/AuthRouter";
import MovieRouter from "./components/movie/MovieRouter";
import ChatRouter from "./components/chat/ChatRouter";
import PaymentRouter from "./components/payment/PaymentRouter";
require("typeface-roboto");

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/auth" component={AuthRouter} />
            <Route path="/chat" component={ChatRouter} />
            <Route path="/payment" component={PaymentRouter} />
            <Route path="/" component={MovieRouter} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
