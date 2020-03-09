"use strict";

import React from "react";
import PropTypes from "prop-types";

import { FlightSearch } from "./FlightSearch";

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
          <FlightSearch />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  headerText: PropTypes.string.isRequired,
  message: PropTypes.string
};
