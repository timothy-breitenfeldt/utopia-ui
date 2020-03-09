"use strict";

import React from "react";
import PropTypes from "prop-types";

import BookingActions from "../actions/bookingActions";

export default class VerifyBookingComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  showFlight(flight, seat_number, index) {
    return (
      <p key={`flight${flight.id}${index}`}>
        Flight {flight.id}: Departing from {flight.origin_airport.city},{" "}
        {flight.origin_airport.id}
        on {flight.departure_date} Seat Number: {seat_number}
        <br />
        Arives in {flight.dest_airport.city}, {flight.dest_airport.id} on{" "}
        {flight.arival_date}
        <br />
        Price: {flight.price}
      </p>
    );
  }

  showItinerary(itinerary, traveler) {
    return (
      <div key={`itinerary${itinerary.id}${traveler.id}`}>
        <h4>{`${traveler.first_name} ${traveler.last_name}`}</h4>
        <p>
          Email Address: {traveler.email}
          <br />
          Phone Number: {traveler.phone}
        </p>
        {this.props.flights.map(
          (f, i) => this.showFlight(f, itinerary.tickets[i], i),
          this
        )}

        <p>
          tax: %0.065
          <br />
          Subtotal: {itinerary.price_total}
          <br />
          Total: {1.065 * flight.price_total}
        </p>
      </div>
    );
  }

  onBookItineraries(event) {
    BookingActions.bookItineraries(
      this.state.booking.travelers,
      this.state.booking.itineraries
    );
  }

  render() {
    let content = null;

    if (this.props.booking.bookingState.pending) {
      content = (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="alert">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else if (this.props.booking.bookingState.success) {
      content = (
        <div>
          <h3>Successfully Booked!</h3>
          <p>Check your email for a copy of your itinerary.</p>
        </div>
      );
    } else {
      content = (
        <div>
          <h3>Verify Information</h3>
          <p>
            Please verify your information below. If anything is incorrect,
            please go back and correct your information now.
          </p>

          <div className="alert alert-danger" role="alert">
            {this.props.booking.error || null}
          </div>

          {this.props.booking.itineraries.map((itinerary, i) =>
            this.showItinerary(itinerary, this.props.booking.travelers[i])
          )}

          <input
            type="button"
            onclick={this.onBookItineraries.bind(this)}
            value="Book Now"
          />
        </div>
      );
    }

    return { content };
  }
}

VerifyBookingComponent.propTypes = {
  booking: PropTypes.object.isRequired,
  flights: PropTypes.array.isRequired
};
