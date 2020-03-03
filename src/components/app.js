"use strict";

import React from "react";
import Cookie from "js-cookie";

<<<<<<< HEAD
import {Header} from './header.js';
import {Home} from './home.js';
<<<<<<< HEAD
import {CounterComponent} from './CounterComponent.js'
import {AgentComponent} from './AgentComponent.js'
import {OnlineComponent} from './OnlineComponent.js'
=======
import {CounterComponent} from './CounterComponent.js';
import {AgentComponent} from './AgentComponent.js';
import {OnlineComponent} from './OnlineComponent.js';
import {FlightSearch} from './FlightSearch.js';
>>>>>>> flight-search
=======
import { Header } from "./header.js";
import { Home } from "./home.js";
import { CounterComponent } from "./CounterComponent.js";
import { AgentComponent } from "./AgentComponent.js";
import { OnlineComponent } from "./OnlineComponent.js";
import LoginComponent from "./LoginComponent.js";
import { getLoginStateObject } from "../factories/loginFactory";
import loginStore from "../stores/loginStore";
>>>>>>> b3a9ff70730c8bda9adb2f282157387a4c19326c

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: getLoginStateObject(),
      itinerary: {
        itineraryList: [],
        pending: false,
        success: false,
        failure: false
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

  _onLoggingIn() {
    this.setState({ loginState: loginStore.loggingIn() });
  }

  componentDidMount() {
    loginStore.addChangeListener(this._onLoggingIn.bind(this));
  }

<<<<<<< HEAD
    render() {
      let content = '';
      if(this.state.user.role === 'COUNTER'){
        content =(
          <CounterComponent/>
        )
      }
      else if(this.state.user.role === 'AGENT'){
        content =(
          <AgentComponent/>
        )
      }
      else if(this.state.user.role === 'ONLINE'){
        content =(
          <OnlineComponent/>
        )
      }
      else{
        content =(
          <div>Hello, Guest User</div>
        )
      }
      return(
          //return whatever is needed that is common between home
          //then add the content
          <div>
            <Header/>
            <Home path="/"/>
            {content}
<<<<<<< HEAD
=======
            <FlightSearch />
>>>>>>> flight-search
          </div>
      );
=======
  componentWillUnmount() {
    loginStore.removeChangeListener(this._onLoggingIn.bind(this));
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
      //content = <div>Hello, Guest User</div>;
      content = <LoginComponent loginState={this.state.loginState} />;
>>>>>>> b3a9ff70730c8bda9adb2f282157387a4c19326c
    }

    return (
      //return whatever is needed that is common between home
      //then add the content
      <div>
        <Header />
        <Home path="/" />
        {content}
      </div>
    );
  }
}
