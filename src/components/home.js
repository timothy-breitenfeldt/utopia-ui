"use strict";

import React from "react";
import PropTypes from "prop-types";

import FlightSearch from "./FlightSearch";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="tagline">
          <h2>{this.props.headerText}</h2>
          <p>{this.props.message}</p>
        </div>

        <div className="container">
          <FlightSearch
            handleTravelerAdd={this.props.handleTravelerAdd}
            handleFlightSelect={this.props.handleFlightSelect}
          />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  handleFlightSelect: PropTypes.func.isRequired,
  handleTravelerAdd: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  message: PropTypes.string
};
