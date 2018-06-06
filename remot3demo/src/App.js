import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import FadeIn from "react-fade-in";

import { Jumbotron } from "react-bootstrap";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import getMuiTheme from "material-ui/styles/getMuiTheme";

import Devices from "./Components/Devices";

class App extends Component {
  state = {
    loggedIn: false,
    loginToken: null,
    currentDevices: []
  };

  logIn = () => {
    var settings = {
      async: true,
      crossDomain: true,
      url: "https://api.remot3.it/apv/v23.5/user/login",
      method: "POST",
      headers: {
        developerkey: "MkNCNzBFNzQtOUU5QS00NUEwLTkxRTktOTdCMjYyRDQyNjNG",
        "content-type": "application/json",
        "cache-control": "no-cache"
      },
      processData: false,
      body:
        '{ "username" : "abhishek.chowdhury247@gmail.com", "password" : "arebhanchod!A1" }'
    };

    fetch(settings.url, settings)
      .then(function(response) {
        return response.json();
      })
      .then(
        function(response) {
          this.setState({
            loggedIn: true,
            loginToken: response.token
          });
          this.getDevices();
        }.bind(this)
      );
  };

  getDevices = () => {
    var settings = {
      async: true,
      crossDomain: true,
      url: "https://api.remot3.it/apv/v23.5/device/list/all",
      method: "GET",
      headers: {
        developerkey: "MkNCNzBFNzQtOUU5QS00NUEwLTkxRTktOTdCMjYyRDQyNjNG",
        token: this.state.loginToken,
        "content-type": "application/json",
        "cache-control": "no-cache"
      }
    };

    fetch(settings.url, settings)
      .then(function(response) {
        return response.json();
      })
      .then(
        function(response) {
          this.setState({
            currentDevices: response.devices
          });
        }.bind(this)
      );
  };

  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: "#3BB642",
        primary2Color: "#3BB642",
        accent1Color: "#FF408C"
      }
    });

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <Jumbotron className="jumbo">
            {!this.state.loggedIn ? (
              <React.Fragment>
                <h1 className="App-title"> Abhisheks Remot3 Project</h1>
                <i> Where deliverables happen </i>
                <br />
                <FadeIn delay={1000} transitionDuration={1200}>
                  <RaisedButton
                    onClick={this.logIn}
                    label={"Login as Abhishek"}
                    primary={true}
                  />
                </FadeIn>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h2> Device Viewer </h2>
                <FadeIn transitionDuration={1200}>
                  <RaisedButton
                    onClick={this.getDevices}
                    label={"Refresh Devices"}
                    primary={true}
                  />
                </FadeIn>
              </React.Fragment>
            )}
          </Jumbotron>
          {this.state.loggedIn && (
            <React.Fragment>
              <Devices currentDevices={this.state.currentDevices} />
            </React.Fragment>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
