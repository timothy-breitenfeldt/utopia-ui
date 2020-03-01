"use strict";

import React from "react";
import Modal from "./Modal";

export default class LoginComponent extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              <form className="form-signin">
                <div className="form-label-group">
                  <label htmlFor="inputEmail">Email address</label>
                  <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
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
}
