"use strict";

import React from "react";
import { Link } from "@reach/router";
export const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <ul className="list-inline">
            <li className="list-inline-item">
              <Link to="/" replace>
                Home
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="/flights/search" replace>
                Flights Search
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="/account" replace>
                Login
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="/account/register" replace>
                Register
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="/itineraries" replace>
                Itineraries
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
