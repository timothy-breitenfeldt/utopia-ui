"use strict";

import { navigate } from "@reach/router";
import React from "react";
import Proptypes from "prop-types";

import * as travelerFactory from "../factories/travelerFactory";

export default class BookingComponent extends React.Component {
  constructor(props) {
    super(props);

    for (let i = 0; i < props.numberOfTravelers; i++) {
      this.props.booking.travelers.push(travelerFactory.getTravelerObject());
    }

    this.state = {
      travelers: props.booking.travelers
    };

    this.onTravelerFormSubmition = this.onTravelerFormSubmition.bind(this);
    this.handelTravelerFormChange = this.handelTravelerFormChange.bind(this);
  }

  onTravelerFormSubmition(event) {
    event.preventDefault();
    for (let i = 0; i < this.props.numberOfTravelers; i++) {
      let itinerariesLength = this.props.booking.itineraries.push({
        user_id: this.props.user.id,
        agency_id: this.props.user.agency_id,
        traveler_id: 0,
        price_total: 0,
        tickets: []
      });

      for (let flight of this.props.flights) {
        const number = Math.floor(Math.random() * flight.capacity) + 1;
        const letter = "abc"[Math.floor(Math.random() * 3)];
        this.props.booking.itineraries[itinerariesLength - 1].price_total +=
          flight.price;
        this.props.booking.itineraries[itinerariesLength - 1].tickets.push({
          flight_number: flight.id,
          price: flight.price,
          seat_number: `${number}${letter}`
        });
      }
    }

    navigate("/booking/verify", { replace: true });
  }

  handelTravelerFormChange(event, index) {
    let newTravelers = [];
    Object.assign(newTravelers, this.state.travelers);
    newTravelers[index][event.target.name] = event.target.value;
    this.setState({ travelers: newTravelers });
  }

  createTravelerFields(index) {
    return (
      <div key={`travelerFields${index}`}>
        <h5>Traveler {index + 1}</h5>
        <div className="form-label-group">
          <label htmlFor={`inputFirstName${index}`}>First Name</label>
          <input
            type="text"
            id={`inputFirstName${index}`}
            className="form-control"
            name="first_name"
            value={this.state.travelers[index].first_name}
            onChange={event => this.handelTravelerFormChange(event, index)}
            required
          />
        </div>

        <div className="form-label-group">
          <label htmlFor={`inputLastName${index}`}>Last Name</label>
          <input
            type="text"
            id={`inputLastName${index}`}
            className="form-control"
            name="last_name"
            value={this.state.travelers[index].last_name}
            onChange={event => this.handelTravelerFormChange(event, index)}
            required
          />
        </div>

        <div className="form-label-group">
          <label htmlFor={`inputEmail${index}`}>Email` address</label>
          <input
            type="email"
            id={`inputEmail${index}`}
            className="form-control"
            name="email"
            value={this.state.travelers[index].email}
            onChange={event => this.handelTravelerFormChange(event, index)}
            required
          />
        </div>

        <div className="form-label-group">
          <label htmlFor={`inputPhone${index}`}>Phone</label>
          <input
            type="phone"
            id={`inputPhone${index}`}
            className="form-control"
            name="phone"
            value={this.state.travelers[index].phone}
            onChange={event => this.handelTravelerFormChange(event, index)}
            required
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h4 className="card-title text-center">Travelers</h4>
              <div className="alert alert-danger" role="alert">
                {this.props.booking.error || null}
              </div>

              <form onSubmit={this.onTravelerFormSubmition} className="form">
                {this.state.travelers.map(
                  (v, i) => this.createTravelerFields(i),
                  this
                )}

                <input
                  type="submit"
                  value="Next"
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BookingComponent.propTypes = {
  booking: Proptypes.object.isRequired,
  user: Proptypes.object.isRequired,
  flights: Proptypes.array.isRequired,
  numberOfTravelers: Proptypes.number.isRequired
};
