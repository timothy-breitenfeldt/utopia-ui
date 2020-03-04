"use strict";

import React from "react";
import Cookie from "js-cookie";

import {Router} from '@reach/router'
import {Header} from './header.js';
import {Home} from './home.js';
import {CounterComponent} from './CounterComponent.js';
import {AgentComponent} from './AgentComponent.js';
import {OnlineComponent} from './OnlineComponent.js';
import {FlightPage} from './FlightPage.js';
import FlightStore from '../stores/flightStore';
import {FlightSearch} from './FlightSearch.js';
import LoginComponent from "./LoginComponent.js";
import { getLoginStateObject } from "../factories/loginFactory";
import loginStore from "../stores/loginStore";
import { ItineraryComponent } from "./ItineraryComponent.js";
import ItineraryStore from "../stores/itineraryStore.js";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: getLoginStateObject(),
      itinerary: {
        itineraryList: [],
        readState: {
          pending: false,
          success: false,
          failure: false
        }
      },
      traveler: {
        travelerList: [],
        readState: {
          pending: false,
          success: false,
          failure: false
        }
      },
      flight: {
        flightList: [],
        readState: {
          pending: false,
          success: false,
          failure: false
        }
      },
      error: ""
    };
  }

    render() {
		let content = "";
		if (this.state.loginState.user.role === "COUNTER") {
			content = <CounterComponent />;
		} else if (this.state.loginState.user.role === "AGENT") {
		content = <AgentComponent />;
		} else if (this.state.loginState.user.role === "TRAVELER") {
		alert(JSON.stringify(this.state.loginState.user));
		alert(Cookie.get("token"));
		content = <OnlineComponent />;
		} else {
			content = <LoginComponent loginState={this.state.loginState} />;
		}
		return(
          //return whatever is needed that is common between home
          //then add the content
          <div>
            <Header/>
            <Home/>
            {content}
            <div>
              <Router>
                <FlightPage path='/flights/search'  flight = {this.state.flight}/>
                <ItineraryComponent path='/itineraries' itinerary = {this.state.itinerary}/>
              </Router>
            </div>
            <FlightSearch />
          </div>
      );
    }
  componentDidMount() {
      loginStore.addChangeListener(this._onLoggingIn.bind(this));
      FlightStore.addChangeListener(this._onFlightChange.bind(this));
      ItineraryStore.addChangeListener(this._onItineraryChange.bind(this));
  }
  
  componentWillUnmount() {
      loginStore.removeChangeListener(this._onLoggingIn.bind(this));
      FlightStore.removeChangeListener(this._onFlightChange.bind(this));
      ItineraryStore.removeChangeListener(this._onItineraryChange.bind(this));
  }
  _onFlightChange(){
      this.setState({flight: FlightStore.getAllflights()});
    }
  _onLoggingIn() {
      this.setState({ loginState: loginStore.loggingIn() });
  }
  _onItineraryChange(){
    this.setState({itinerary: ItineraryStore.getAllitineraries()});
  }
}

