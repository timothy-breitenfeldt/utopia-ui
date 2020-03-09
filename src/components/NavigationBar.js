"use strict";

import React from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import {Navbar} from "react-bootstrap";
export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  generateLinks() {
    const links = [];

    for (const [name, path] of Object.entries(this.props.links)) {
      links.push(
        <li key={name} className="list-inline-item">
          <Link to={path} style={{margin: 10,color: "white", textDecoration: "none"}} replace>
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
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            {this.generateLinks()}
          </Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  links: PropTypes.object.isRequired
};
