"use strict";

import React from "react";
import { Router } from "@reach/router";

import * as accountFactory from "../factories/accountFactory";
import * as travelerFactory from "../factories/travelerFactory";
import * as flightFactory from "../factories/flightFactory";
import * as itineraryFactory from "../factories/itineraryFactory";
import * as ticketFactory from "../factories/ticketFactory";
import NavigationBar from "./NavigationBar";
import Home from "./home.js";
import { FlightPage } from "./FlightPage.js";
import FlightStore from "../stores/flightStore";
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
      flight: flightFactory.getFlightStateObject()
    };
    this.changeSearchItinerary = this.changeSearchItinerary.bind(this);
  }

  changeSearchItinerary(id) {
    const temp = { ...this.state.itinerary };
    temp.itineraryId = id;
    this.setState({ itinerary: temp });
  }

  _updateAccountState() {
    this.setState({ account: accountStore.updateAccountState() });
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
    let links = null;
    let headerText = null;
    let message = null;
    const user = this.state.account.user;

    if (this.state.account.user.role == "COUNTER") {
      links = {
        Home: "/",
        Logout: "/account/logout",
        Itineraries: "/itineraries"
      };
      headerText = `Welcome ${user.first_name} ${user.last_name}`;
      message = "Counter Agent";
    } else if (this.state.account.user.role == "AGENT") {
      links = {
        Home: "/",
        Logout: "/account/logout",
        Itineraries: "/itineraries"
      };
      headerText = `Welcome ${user.first_name} ${user.last_name}`;
      message = "Travel Agent";
    } else if (this.state.account.user.role == "TRAVELER") {
      links = {
        Home: "/",
        Logout: "/account/logout",
        Itineraries: "/itineraries"
      };
      headerText = `Welcome ${user.first_name} ${user.last_name}`;
      message = "Online User";
    } else {
      links = {
        Home: "/",
        Login: "/account",
        Register: "/account/register"
      };
      headerText = "Welcome";
    }

    return (
      <div>
        <header>
          <div className="page-header">
            <h1>Utopia Airline Reservation System</h1>
          </div>
          <NavigationBar links={links} />
        </header>

        <Router>
          <Home path="/" headerText={headerText} message={message} />
          <LoginComponent path="/account" account={this.state.account} />
          <RegistrationComponent
            path="/account/register"
            account={this.state.account}
          />
          <LogoutComponent
            path="/account/logout"
            account={this.state.account}
          />
          <FlightPage path="/flights/search" flight={this.state.flight} />
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
