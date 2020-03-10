"use strict";

import React from "react";
import { Router, navigate } from "@reach/router";

import * as accountFactory from "../factories/accountFactory";
import * as travelerFactory from "../factories/travelerFactory";
import * as flightFactory from "../factories/flightFactory";
import * as itineraryFactory from "../factories/itineraryFactory";
import * as ticketFactory from "../factories/ticketFactory";
import * as bookingFactory from "../factories/bookingFactory";
import BookingComponent from "./BookingComponent";
import VerifyBookingComponent from "./VerifyBookingComponent";
import NavigationBar from "./NavigationBar";
import Home from "./home.js";
import FlightStore from "../stores/flightStore";
import LoginComponent from "./LoginComponent.js";
import accountStore from "../stores/accountStore";
import ticketStore from "../stores/ticketStore";
import ItineraryStore from "../stores/itineraryStore";
import { ItineraryDeletedComponent } from "./itineraryDeletedComponent";
import RegistrationComponent from "./RegistrationComponent";
import { ItinerariesComponent } from "./ItinerariesComponent";
import { ItineraryPage } from "./ItineraryPage";
import { ItinerariesTravelerPage } from "./ItinerariesTravelerPage";
import { TravelerComponent } from "./TravelerComponent";
import LogoutComponent from "./LogoutComponent";
import TravelerStore from "../stores/travelerStore";
import bookingStore from "../stores/bookingStore";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: accountFactory.getAccountStateObject(),
      booking: bookingFactory.getBookingStateObject(),
      itinerary: itineraryFactory.getItineraryStateObject(),
      ticket: ticketFactory.getTicketStateObject(),
      traveler: travelerFactory.getTravelerStateObject(),
      flight: flightFactory.getFlightStateObject(),
      travelers: null,
      selectedFlights: []
    };

    this.handleTravelerAdd = this.handleTravelerAdd.bind(this);
    this.handleFlightSelect = this.handleFlightSelect.bind(this);
    this.changeSearchItinerary = this.changeSearchItinerary.bind(this);
    this.changeSearchTravelerItinerary = this.changeSearchTravelerItinerary.bind(
      this
    );

    this.flights = [
      {
        id: 1,
        capacity: 43,
        price: 63.0,
        arrival_date: "2019-04-06",
        departure_date: "2019-11-06",
        dest_airport: {
          id: 13,
          name: "Ollie",
          street: "Flade",
          country: "Indonesia",
          state: null,
          city: "Setonokalong",
          postal_code: null
        },
        origin_airport: {
          id: 24,
          name: "Ambrose",
          street: "Daltrey",
          country: "Portugal",
          state: "├ëvora",
          city: "Cabrela",
          postal_code: "7050-405"
        }
      }
    ];
  }

  handleTravelerAdd(noOfTravelers) {
    this.setState({ travelers: noOfTravelers });
  }

  handleFlightSelect(flight) {
    let flightList = this.state.selectedFlights;
    flightList.push(flight);
    this.setState({ selectedFlights: flightList });
    navigate("/booking");
  }

  changeSearchItinerary(id) {
    const temp = { ...this.state.itinerary };
    temp.itineraryId = id;
    this.setState({ itinerary: temp });
  }

  changeSearchTravelerItinerary(id) {
    console.log(id);
    const temp = { ...this.state.traveler };
    temp.travelerId = id;
    this.setState({ traveler: temp });
  }

  _updateAccountState() {
    this.setState({ account: accountStore.updateAccountState() });
  }

  _updateBookingState() {
    this.setState({ booking: bookingStore.updateBookingState() });
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

  _onTravelerChange() {
    this.setState({ traveler: TravelerStore.getAlltravelers() });
  }

  componentDidMount() {
    accountStore.addChangeListener(this._updateAccountState.bind(this));
    bookingStore.addChangeListener(this._updateBookingState.bind(this));
    FlightStore.addChangeListener(this._onFlightChange.bind(this));
    ItineraryStore.addChangeListener(this._onItineraryChange.bind(this));
    ticketStore.addChangeListener(this._onTicketChange.bind(this));
    TravelerStore.addChangeListener(this._onTravelerChange.bind(this));
  }

  componentWillUnmount() {
    accountStore.removeChangeListener(this._updateAccountState.bind(this));
    FlightStore.removeChangeListener(this._onFlightChange.bind(this));
    ItineraryStore.removeChangeListener(this._onItineraryChange.bind(this));
    ticketStore.removeChangeListener(this._onTicketChange.bind(this));
    TravelerStore.removeChangeListener(this._onTravelerChange.bind(this));
  }

  render() {
    let links = null;
    let headerText = null;
    let message = null;
    const user = this.state.account.user;

    if (this.state.account.user.role == "COUNTER") {
      links = {
        Home: "/",
        Itineraries: "/itineraries",
        Traveler: "/travelers",
        Booking: "/booking",
        Logout: "/account/logout"

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
        Itineraries: "/itineraries",
        Booking: "/booking"
      };
      headerText = `Welcome ${user.first_name} ${user.last_name}`;
      message = "Online User";
    } else {
      links = {
        Home: "/",
        Login: "/account",
        Register: "/account/register",
        Booking: "/booking"
      };
      headerText = "Welcome";
    }

    return (
      <div>
        <header>
          <div className="titleClass">
            <h1>Utopia Airline Reservation System</h1>
          </div>
          <NavigationBar links={links} />
        </header>
        
        <Router>
          <Home
            path="/"
            headerText={headerText}
            message={message}
            handleFlightSelect={this.handleFlightSelect}
            handleTravelerAdd={this.handleTravelerAdd}
          />
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
            account={this.state.account}
            updateSearchItinerary={this.changeSearchItinerary}
          />
          <ItineraryPage
            path={`/itineraries/${this.state.itinerary.itineraryId}`}
            ticket={this.state.ticket}
            itineraryId={this.state.itinerary.itineraryId}
          />
          <TravelerComponent
            path="/travelers"
            traveler={this.state.traveler}
            changeSearchTravelerItinerary={this.changeSearchTravelerItinerary}
          />
          <ItinerariesTravelerPage
            path={`/itineraries/travelers/${this.state.traveler.travelerId}`}
            itinerary={this.state.itinerary}
            travelerId={this.state.traveler.travelerId}
            updateSearchItinerary={this.changeSearchItinerary}
          />
          <BookingComponent
            path="/booking"
            user={this.state.account.user}
            booking={this.state.booking}
            numberOfTravelers={this.state.travelers}
            flights={this.state.selectedFlights}
          />
          <VerifyBookingComponent
            path="/booking/verify"
            booking={this.state.booking}
            flights={this.state.selectedFlights}
          />
          <ItineraryDeletedComponent path="/itineraries/update" />
        </Router>
      </div>
    );
  }
}
