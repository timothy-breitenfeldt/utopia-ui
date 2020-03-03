"use strict"

import React from 'react';
import { Link } from "@reach/router";
export const Header = () => {
    return(
        <div>
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <ul className="list-inline">
                    <li className="list-inline-item"><Link to="/" replace>Home</Link></li>
                    <li className="list-inline-item"><Link to="/flights/search" replace>Flights Search</Link></li>
                    <li className="list-inline-item"><Link to="/path/2" replace>RESOURCE 2</Link></li>
                </ul>
            </div>
        </nav>
        </div>
    );
}
