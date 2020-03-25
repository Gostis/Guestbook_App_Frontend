import React, { Component } from "react";
import "./App.css";
import AuthService from "./AuthService";

import { Switch, Route } from "react-router-dom";
import Home from "./Home";

class App extends Component {
  constructor() {
    super();
    this.authService = new AuthService();
  }

  createLogoutButton() {
    let button = null;

    if (this.authService.isAuthenticated()) {
      button = (
        <button onClick={() => this.authService.logout()}>Logout</button>
      );
    }

    return button;
  }

  renderHome() {
    console.log("hello");
    let resultComponent = <Home auth={this.authService} />;

    if (!this.authService.isAuthenticated()) {
      this.authService.login();
      resultComponent = (
        <div>
          <p>Redirecting to the authentication service...</p>
        </div>
      );
    }

    return resultComponent;
  }

  startSession(history) {
    this.authService.handleAuthentication(history);
    return (
      <div>
        <p>Starting session...</p>
      </div>
    );
  }

  render() {
    let logoutButton = this.createLogoutButton();

    return (
      <div className="App">
        <header className="App-header">
          {logoutButton}
          <button onClick={() => this.authService.logout()}>Logout</button>
          <h1 className="App-title">My Users</h1>
        </header>
        <Switch>
          <Route exact path="/" render={() => this.renderHome()} />
          <Route
            path="/startSession"
            render={({ history }) => this.startSession(history)}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
