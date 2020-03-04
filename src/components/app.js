"use strict";

import React from "react";
import Cookie from "js-cookie";
import { Router, Redirect } from "@reach/router";

import * as accountFactory from "../factories/accountFactory";
import * as travelerFactory from "../factories/travelerFactory";
import * as flightFactory from "../factories/flightFactory";
import * as itineraryFactory from "../factories/itineraryFactory";
import { Header } from "./header.js";
import { Home } from "./home.js";
import { CounterComponent } from "./CounterComponent.js";
import { AgentComponent } from "./AgentComponent.js";
import { OnlineComponent } from "./OnlineComponent.js";
import { FlightPage } from "./FlightPage.js";
import FlightStore from "../stores/flightStore";
import { FlightSearch } from "./FlightSearch.js";
import LoginComponent from "./LoginComponent.js";
import accountStore from "../stores/accountStore";
import ItineraryStore from "../stores/itineraryStore";
import RegistrationComponent from "./RegistrationComponent";
import { ItineraryComponent } from "./ItineraryComponent";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountState: accountFactory.getAccountStateObject(),
      itinerary: itineraryFactory.getItineraryStateObject(),
      traveler: travelerFactory.getTravelerStateObject(),
      flight: flightFactory.getFlightStateObject(),
      error: ""
    };
  }

  _updateAccountState() {
    this.setState({ accountState: accountStore.updateAccountState() });
  }

  _onFlightChange() {
    this.setState({ flight: FlightStore.getAllflights() });
  }

  _onItineraryChange(){
    this.setState({itinerary: ItineraryStore.getAllitineraries()});
  }

  componentDidMount() {
    accountStore.addChangeListener(this._updateAccountState.bind(this));
    FlightStore.addChangeListener(this._onFlightChange.bind(this));
    ItineraryStore.addChangeListener(this._onItineraryChange.bind(this));
  }

  componentWillUnmount() {
    accountStore.removeChangeListener(this._updateAccountState.bind(this));
    FlightStore.removeChangeListener(this._onFlightChange.bind(this));
    ItineraryStore.removeChangeListener(this._onItineraryChange.bind(this));
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
      <div>
        <Header />
        <FlightSearch />
        {content}
        <Router>
          <CounterComponent path="/counter" />
          <OnlineComponent path="/online" />
          <AgentComponent path="/agent" />
          <FlightPage path="/flights/search" flight={this.state.flight} />
          <LoginComponent
            path="/account"
            accountState={this.state.accountState}
          />
          <RegistrationComponent
            path="/account/register"
            accountState={this.state.accountState}
          />
          <ItineraryComponent path="/itineraries" itinerary={this.state.itinerary}/>
        </Router>
      </div>
    );
  }
}
