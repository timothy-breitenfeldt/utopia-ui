"use strict"

import React from 'react';
import { Link } from "@reach/router";


export const Header = () => {
    return(
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <ul className="list-inline">
                    <li className="list-inline-item">
                      <Link to="/" replace>Home </Link>
                    </li>
                    <li className="list-inline-item"><Link to="/" replace>Home</Link></li>
                    <li className="list-inline-item"><Link to="/path/1" replace>RESOURCE 1</Link></li>
                    <li className="list-inline-item"><Link to="/path/2" replace>RESOURCE 2</Link></li>
                </ul>
            </div>
        </nav>
    );
}
