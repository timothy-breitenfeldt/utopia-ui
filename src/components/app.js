"use strict";

import React from "react";
import Cookie from "js-cookie";
import { Router, Redirect } from "@reach/router";

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
import accountStore from "../stores/accountStore";
import RegistrationComponent from "./RegistrationComponent";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountState: accountFactory.getAccountStateObject(),
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

  _updateAccountState() {
    this.setState({ accountState: accountStore.updateAccountState() });
  }

  _onFlightChange() {
    this.setState({ flight: FlightStore.getAllflights() });
  }

  componentDidMount() {
    accountStore.addChangeListener(this._updateAccountState.bind(this));
    FlightStore.addChangeListener(this._onFlightChange.bind(this));
  }

  componentWillUnmount() {
    accountStore.removeChangeListener(this._updateAccountState.bind(this));
    FlightStore.removeChangeListener(this._onFlightChange.bind(this));
  }

  render() {
    let content = "";

    if (this.state.accountState.redirectToLogin) {
      content = <Redirect to="/account" />;
    } else if (this.state.accountState.user.role === "COUNTER") {
      content = <Redirect to="/counter" />;
    } else if (this.state.accountState.user.role === "AGENT") {
      content = <Redirect to="/agent" />;
    } else if (this.state.accountState.user.role === "TRAVELER") {
      alert(JSON.stringify(this.state.accountState.user));
      alert(Cookie.get("token"));
      content = <Redirect to="/online" />;
    } else {
      content = <Home />;
    }
    return (
      //return whatever is needed that is common between home
      //then add the content
      <div>
        <Router>
          <CounterComponent path="/counter" />
          <OnlineComponent path="/online" />
          <FlightPage path="/flights/search" flight={this.state.flight} />
          <LoginComponent
            path="/account"
            accountState={this.state.accountState}
          />
          <RegistrationComponent
            path="/account/register"
            accountState={this.state.accountState}
          />
        </Router>
        <AgentComponent path="/agent" />
        <Header />
        <FlightSearch />
        {content}
      </div>
    );
  }
}
