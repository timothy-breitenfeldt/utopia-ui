"use strict";

import React from "react";
import Proptypes from "prop-types";

import * as travelerFactory from "../factories/travelerFactory";
import BookingActions from "../actions/bookingActions";

export default class BookingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraries: props.booking.itineraries,
      travelers: props.booking.travelers
    };

    for (let i = 0; i < props.numberOfTravelers; i++) {
      this.state.travelers.push(travelerFactory.getTravelerObject());
    }

    this.onTravelerFormSubmition = this.onTravelerFormSubmition.bind(this);
    this.handelTravelerFormChange = this.handelTravelerFormChange.bind(this);
  }

  onTravelerFormSubmition(event) {
    event.preventDefault();
    BookingActions.createTravelers(this.state.travelers);
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
    let content = null;

    if (this.props.booking.travelerState.pending) {
      content = (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="alert">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      content = (
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

    return <div>{content}</div>;
  }
}

BookingComponent.propTypes = {
  booking: Proptypes.object.isRequired,
  user: Proptypes.object.isRequired,
  flights: Proptypes.array.isRequired,
  numberOfTravelers: Proptypes.number.isRequired
};
