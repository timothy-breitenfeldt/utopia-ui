"use strict";

import React from "react";
import PropTypes from "prop-types";

import BookingActions from "../actions/bookingActions";

export default class VerifyBookingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.finalTotal = 0;
    this.onBookItineraries = this.onBookItineraries.bind(this);
  }

  showItinerary(itinerary, traveler) {
    this.finalTotal += itinerary.price_total;
    return (
      <div key={`itinerary${itinerary.id}${traveler.id}`}>
        <h4>{`${traveler.first_name} ${traveler.last_name}`}</h4>
        <p>
          Email Address: {traveler.email}
          <br />
          Phone Number: {traveler.phone}
        </p>

        {this.props.flights.map(
          (flight, i) =>
            this.showFlight(flight, itinerary.tickets[i].seat_number, i),
          this
        )}
      </div>
    );
  }

  showFlight(flight, seat_number, index) {
    return (
      <div key={`flight${flight.id}${index}`}>
        <p>
          Flight {flight.id}: Departing from {flight.origin_airport.city} on{" "}
          {flight.departure_date} Seat Number: {seat_number}
          <br />
          Arives in {flight.dest_airport.city} on {flight.arrival_date}
          <br />
          Price: {flight.price}
        </p>
      </div>
    );
  }

  onBookItineraries() {
    BookingActions.bookItineraries(
      this.props.booking.travelers,
      this.props.booking.itineraries
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

          <p>
            tax: %0.065
            <br />
            Subtotal: {this.finalTotal}
            <br />
            Total: {(this.finalTotal * 1.065).toFixed(2)}
          </p>

          <input
            type="button"
            onClick={this.onBookItineraries}
            value="Book Now"
          />
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

VerifyBookingComponent.propTypes = {
  booking: PropTypes.object.isRequired,
  flights: PropTypes.array.isRequired
};
