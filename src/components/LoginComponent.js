"use strict";

import React from "react";
import Modal from "./Modal";

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handelFormChange = this.handelFormChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    //LoginActions.login(this.state.email, this.state.password);
  }

  handelFormChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getError() {
    if (this.props.loginState.authenticationState.failure) {
      return (
        <div className="alert alert-danger" role="alert">
          {this.props.error}
        </div>
      );
    }
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
                {this.getError()}

                <form onSubmit={this.onSubmit} className="form-signin">
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

                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Sign in
                  </button>
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
