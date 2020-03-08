"use strict";

import React from "react";
import Proptypes from "prop-types";

import * as travelerFactory from "../factories/travelerFactory";
import BookingAction from "../actions/bookingActions";
import BookingActions from "../actions/bookingActions";

export default class BookingComponent extends React.Component {
  constructor(props) {
    super(props);
    thisstate = {
      itineraries: [],
      travelers: []
    };

    for (let i = 0; i < props.numberOfTravelers; i++) {
      this.state.travelers.push(travelerFactory.getTravelerObject());
    }

    this.onFormSubmition = this.onTravelerFormSubmition.bind(this);
    this.handelFormChange = this.handelTravelerFormChange.bind(this);
  }

  onTravelerFormSubmition(event) {
    event.preventDefault();
    BookingActions.createTravelers(this.state.travelers);
  }

  handelTravelerFormChange(event) {
    const newTravelers = { ...this.state.travelers };
    newTravelers[event.target.index][event.target.name] = event.target.value;
    this.setState({ travelers: newTravelers });
  }

  createTravelerFields(index) {
    return (
      <div>
        <h5>Traveler {index + 1}</h5>
        <div className="form-label-group">
          <label htmlFor={`inputFirstName${index}`}>First Name</label>
          <input
            type="text"
            id={`inputFirstName${index}`}
            className="form-control"
            name="first_name"
            value={this.state.travelers[index].first_name}
            index={index}
            onChange={this.handelTravelerFormChange}
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
            index={index}
            onChange={this.handelTravelerFormChange}
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
            index={index}
            onChange={this.handelTravelerFormChange}
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
            index={index}
            onChange={this.handelTravelerFormChange}
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
    } else if (this.props.booking.travelerState.successful) {
      //Get seat number.
      content = null;
    } else {
      content = (
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h4 className="card-title text-center">Travelers</h4>
                <div className="alert alert-danger" role="alert">
                  {this.props.account.error || null}
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
