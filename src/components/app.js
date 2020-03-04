"use strict";

import React from "react";
import Cookie from "js-cookie";

import { Router } from "@reach/router";
import { Header } from "./header.js";
import { Home } from "./home.js";
import { CounterComponent } from "./CounterComponent.js";
import { AgentComponent } from "./AgentComponent.js";
import { OnlineComponent } from "./OnlineComponent.js";
import { FlightPage } from "./FlightPage.js";
import FlightStore from "../stores/flightStore";
import { FlightSearch } from "./FlightSearch.js";
import LoginComponent from "./LoginComponent.js";
import * as accountFactory from "../factories/accountFactory";
import loginStore from "../stores/loginStore";
import RegistrationComponent from "./RegistrationComponent";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: accountFactory.getLoginStateObject(),
      registrationState: accountFactory.getRegistrationStateObject(),
      itinerary: {
        itineraryList: [],
        pending: false,
        success: false,
        failure: false
      },
      traveler: {
        travelerList: [],
        readState: {
          pending: false,
          success: false,
          failure: false
        }
      },
      flight: {
        flightList: [],
        readState: {
          pending: false,
          success: false,
          failure: false
        }
      },
      error: ""
    };
  }

  _onLoggingIn() {
    this.setState({ loginState: loginStore.loggingIn() });
  }

  _onFlightChange() {
    this.setState({ flight: FlightStore.getAllflights() });
  }

  componentDidMount() {
    loginStore.addChangeListener(this._onLoggingIn.bind(this));
    FlightStore.addChangeListener(this._onFlightChange.bind(this));
  }

  componentWillUnmount() {
    loginStore.removeChangeListener(this._onLoggingIn.bind(this));
    FlightStore.removeChangeListener(this._onFlightChange.bind(this));
  }

  render() {
    let content = "";
    if (this.state.loginState.user.role === "COUNTER") {
      content = <CounterComponent />;
    } else if (this.state.loginState.user.role === "AGENT") {
      content = <AgentComponent />;
    } else if (this.state.loginState.user.role === "TRAVELER") {
      alert(JSON.stringify(this.state.loginState.user));
      alert(Cookie.get("token"));
      content = <OnlineComponent />;
    } else {
      content = <Home />;
    }
    return (
      //return whatever is needed that is common between home
      //then add the content
      <div>
        <Header />
        <FlightSearch />

        {content}
        <Router>
          <FlightPage path="/flights/search" flight={this.state.flight} />
          <LoginComponent path="/account" loginState={this.state.loginState} />
          <RegistrationComponent
            path="/account/register"
            registrationState={this.state.registrationState}
          />
        </Router>
      </div>
    );
  }
}
