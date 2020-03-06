"use strict";

import React from "react";
import PropTypes from "prop-types";

import AccountAction from "../actions/accountActions";

export default class LogoutComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AccountAction.logout();
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="alert">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

LogoutComponent.propTypes = {
  accountState: PropTypes.object.isRequired
};
