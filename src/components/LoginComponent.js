"use strict";

import React from "react";
import PropTypes from "prop-types";

import LoginActions from "../actions/LoginActions";

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.onFormSubmition = this.onFormSubmition.bind(this);
    this.handelFormChange = this.handelFormChange.bind(this);
  }

  onFormSubmition(event) {
    event.preventDefault();
    LoginActions.login(this.state.email, this.state.password);
  }

  handelFormChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    let content = null;

    if (this.props.loginState.authenticationState.pending) {
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
                <h5 className="card-title text-center">Sign In</h5>
                <div
                  className="alert alert-danger"
                  role="alert"
                  aria-live="assertive"
                >
                  {JSON.stringify(this.props.loginState.error)}
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
                      placeholder="Email address"
                      required
                      autoFocus
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
                      placeholder="Password"
                      required
                    />
                  </div>

                  <input
                    type="submit"
                    value="Sign in"
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

LoginComponent.propTypes = {
  loginState: PropTypes.object.isRequired
};
