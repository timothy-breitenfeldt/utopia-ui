"use strict"

import React from 'react';

import {Router} from '@reach/router'
import {Header} from './header.js';
import {Home} from './home.js';
import {CounterComponent} from './CounterComponent.js';
import {AgentComponent} from './AgentComponent.js';
import {OnlineComponent} from './OnlineComponent.js';
import {FlightPage} from './FlightPage.js';
import FlightStore from '../store/flightStore';
export class App extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
        user:{
          role: ''
        },
        itinerary:{
          itineraryList:[],
          pending:false,
          success:false,
          failure:false
        },
        traveler:{
          travelerList:[],
          readState:{
            pending:false,
            success:false,
            failure:false
          }
        },
        flight:{
          flightList:[],
          readState:{
            pending:false,
            success:false,
            failure:false
          }
        },
        error: ''
      };
    }

    render() {
      let content = '';
      if(this.state.user.role === 'COUNTER'){
        content = (
          <CounterComponent {...this.props}/>
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
        content = (
          <div>
            <Router>
              <FlightPage path='/flights/search'  flight = {this.state.flight}/>
            </Router>
          </div>
        );
      }
      return(
          //return whatever is needed that is common between home
          //then add the content
          <div>
            <Header/>
            <Home/>
            {content}
          </div>
      );
    }

    componentDidMount(){
      FlightStore.addChangeListener(this._onFlightChange.bind(this));
    }
    componentWillUnmount(){
      FlightStore.removeChangeListener(this._onFlightChange.bind(this));
    }
    _onFlightChange(){
      this.setState({flight: FlightStore.getAllflights()});
    }
}

