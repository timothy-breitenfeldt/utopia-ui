"use strict";

import React from "react";
import PropTypes from "prop-types";

import AccountActions from "../actions/accountActions";

export default class RegistrationComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      role: "",
      first_name: "",
      last_name: "",
      dob: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
      password: "",
      confirm_password: ""
    };

    this.onFormSubmition = this.onFormSubmition.bind(this);
    this.handelFormChange = this.handelFormChange.bind(this);
  }

  onFormSubmition(event) {
    event.preventDefault();
    AccountActions.login(this.state.email, this.state.password);
  }

  handelFormChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getError() {
    return (
      <div className="alert alert-danger">{this.props.accountState.error}</div>
    );
  }

  render() {
    let content = null;

    if (this.props.accountState.registrationState.pending) {
      content = (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
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
                <h5 className="card-title text-center">Register</h5>
                <div aria-live="assertive">
                  {this.props.accountState.error ? this.getError() : null}
                </div>

                <form onSubmit={this.onFormSubmition} className="form-signin">
                  <div className="form-label-group">
                    <label htmlFor="inputEmail">Email address</label>
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.handelFormChange}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputFirstName">First Name</label>
                    <input
                      type="text"
                      id="inputFirstName"
                      className="form-control"
                      name="first_name"
                      value={this.state.first_name}
                      onChange={this.handelFormChange}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputLastName">Last Name</label>
                    <input
                      type="text"
                      id="inputLastName"
                      className="form-control"
                      name="last_name"
                      value={this.state.last_name}
                      onChange={this.handelFormChange}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputBirthday">Birthday</label>
                    <input
                      type="date"
                      id="inputBirthday"
                      className="form-control"
                      name="bod"
                      value={this.state.bod}
                      onChange={this.handelFormChange}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputPhone">Phone</label>
                    <input
                      type="phone"
                      id="inputPhone"
                      className="form-control"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.handelFormChange}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputStreet">Street</label>
                    <input
                      type="text"
                      id="inputStreet"
                      className="form-control"
                      name="street"
                      value={this.state.street}
                      onChange={this.handelFormChange}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputCity">City</label>
                    <input
                      type="text"
                      id="inputCity"
                      className="form-control"
                      name="city"
                      value={this.state.city}
                      onChange={this.handelFormChange}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputState">State</label>
                    <input
                      type="text"
                      id="inputState"
                      className="form-control"
                      name="state"
                      value={this.state.state}
                      onChange={this.handelFormChange}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputCountry">Country</label>
                    <input
                      type="text"
                      id="inputCountry"
                      className="form-control"
                      name="country"
                      value={this.state.country}
                      onChange={this.handelFormChange}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputPostalCode">Postal Code</label>
                    <input
                      type="text"
                      id="inputPostalCode"
                      className="form-control"
                      name="postal_code"
                      value={this.state.postal_code}
                      onChange={this.handelFormChange}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.handelFormChange}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="inputConfirmPassword">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="inputConfirmPassword"
                      className="form-control"
                      name="confirm_password"
                      value={this.state.confirm_password}
                      onChange={this.handelFormChange}
                      required
                    />
                  </div>

                  <input
                    type="submit"
                    value="Register"
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

RegistrationComponent.propTypes = {
  accountState: PropTypes.object.isRequired
};
