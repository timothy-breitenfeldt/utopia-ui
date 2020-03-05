"use strict";

import React from "react";
import Cookie from "js-cookie";
import { Router, Redirect } from "@reach/router";

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
import {ItineraryPage} from "./ItineraryPage";
import TicketStore from "../stores/ticketStore";
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraryId: 0,
      accountState: accountFactory.getAccountStateObject(),
      itinerary: itineraryFactory.getItineraryStateObject(),
      ticket: ticketFactory.getTicketStateObject(),
      traveler: travelerFactory.getTravelerStateObject(),
      flight: flightFactory.getFlightStateObject(),
      error: ""
    };
    this.changeSearchItinerary = this.changeSearchItinerary.bind(this);
  }

  changeSearchItinerary(id){
    this.setState({itineraryId: id});
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

  _onTicketChange(){
    this.setState({ticket: TicketStore.getAlltickets()});
  }
  componentDidMount() {
    accountStore.addChangeListener(this._updateAccountState.bind(this));
    FlightStore.addChangeListener(this._onFlightChange.bind(this));
    ItineraryStore.addChangeListener(this._onItineraryChange.bind(this));
    ticketStore.addChangeListener(this._onTicketChange.bind(this));
  }

  componentWillUnmount() {
    accountStore.removeChangeListener(this._updateAccountState.bind(this));
    FlightStore.removeChangeListener(this._onFlightChange.bind(this));
    ItineraryStore.removeChangeListener(this._onItineraryChange.bind(this));
    ticketStore.removeChangeListener(this._onTicketChange.bind(this));
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
          <ItinerariesComponent path="/itineraries" itinerary={this.state.itinerary} updateSearchItinerary={this.changeSearchItinerary} />
          <ItineraryPage path={`/itineraries/${this.state.itineraryId}`} itineraryId={this.state.itineraryId} ticket={this.state.ticket}/>
        </Router>
      </div>
    );
  }
}
