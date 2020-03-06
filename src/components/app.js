"use strict";

import React from "react";
import Cookie from "js-cookie";
import { Router, navigate } from "@reach/router";

import * as accountFactory from "../factories/accountFactory";
import * as travelerFactory from "../factories/travelerFactory";
import * as flightFactory from "../factories/flightFactory";
import * as itineraryFactory from "../factories/itineraryFactory";
import * as ticketFactory from "../factories/ticketFactory";
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
import ticketStore from "../stores/ticketStore";
import ItineraryStore from "../stores/itineraryStore";
import RegistrationComponent from "./RegistrationComponent";
import { ItinerariesComponent } from "./ItinerariesComponent";
import { ItineraryPage } from "./ItineraryPage";
import LogoutComponent from "./LogoutComponent";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: accountFactory.getAccountStateObject(),
      itinerary: itineraryFactory.getItineraryStateObject(),
      ticket: ticketFactory.getTicketStateObject(),
      traveler: travelerFactory.getTravelerStateObject(),
      flight: flightFactory.getFlightStateObject(),
      error: ""
    };
    this.changeSearchItinerary = this.changeSearchItinerary.bind(this);
  }

  changeSearchItinerary(id) {
    const temp = { ...this.state.itinerary };
    temp.itineraryId = id;
    this.setState({ itinerary: temp });
  }

  _updateaccount() {
    this.setState({ account: accountStore.updateaccount() });
  }

  _onFlightChange() {
    this.setState({ flight: FlightStore.getAllflights() });
  }

  _onItineraryChange() {
    this.setState({ itinerary: ItineraryStore.getAllitineraries() });
  }

  _onTicketChange() {
    this.setState({ ticket: ticketStore.getAlltickets() });
  }
  componentDidMount() {
    accountStore.addChangeListener(this._updateaccount.bind(this));
    FlightStore.addChangeListener(this._onFlightChange.bind(this));
    ItineraryStore.addChangeListener(this._onItineraryChange.bind(this));
    ticketStore.addChangeListener(this._onTicketChange.bind(this));
  }

  componentWillUnmount() {
    accountStore.removeChangeListener(this._updateaccount.bind(this));
    FlightStore.removeChangeListener(this._onFlightChange.bind(this));
    ItineraryStore.removeChangeListener(this._onItineraryChange.bind(this));
    ticketStore.removeChangeListener(this._onTicketChange.bind(this));
  }

  render() {
    if (this.state.account.redirectToLogin) {
      navigate("/account", { replace: true });
    } else if (this.state.account.user.role === "COUNTER") {
      navigate("/counter", { replace: true });
    } else if (this.state.account.user.role === "AGENT") {
      navigate("/agent", { replace: true });
    } else if (this.state.account.user.role === "TRAVELER") {
      alert(JSON.stringify(this.state.accountState.user));
      alert(Cookie.get("token"));
      navigate("/online", { replace: true });
    } else {
      navigate("/");
    }

    return (
      <div>
        <Header />
        <FlightSearch />

        <Router>
          <Home path="/" />
          <CounterComponent path="/counter" />
          <OnlineComponent path="/online" />
          <AgentComponent path="/agent" />
          <FlightPage path="/flights/search" flight={this.state.flight} />
          <LoginComponent path="/account" account={this.state.account} />
          <RegistrationComponent
            path="/account/register"
            account={this.state.account}
          />
          <LogoutComponent
            path="/account/logout"
            account={this.state.account}
          />
          <ItinerariesComponent
            path="/itineraries"
            itinerary={this.state.itinerary}
            updateSearchItinerary={this.changeSearchItinerary}
          />
          <ItineraryPage
            path={`/itineraries/${this.state.itinerary.itineraryId}`}
            ticket={this.state.ticket}
            itineraryId={this.state.itinerary.itineraryId}
          />
        </Router>
      </div>
    );
  }
}
