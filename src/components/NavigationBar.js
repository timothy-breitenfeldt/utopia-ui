"use strict";

import React from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  generateLinks() {
    const links = [];

    for (const [name, path] of Object.entries(this.props.links)) {
      links.push(
        <li key={name} className="list-inline-item">
          <Link to={path} replace>
            {name}
          </Link>
        </li>
      );
    }

    return links;
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <ul className="list-inline">{this.generateLinks()}</ul>
          </div>
        </nav>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  links: PropTypes.object.isRequired
};
