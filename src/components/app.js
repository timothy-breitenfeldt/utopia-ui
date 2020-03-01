"use strict"

import React from 'react';

import {Header} from './header.js';
import {Home} from './home.js';
import {CounterComponent} from './CounterComponent.js'
import {AgentComponent} from './AgentComponent.js'
import {OnlineComponent} from './OnlineComponent.js'

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
          </div>
      );
    }
}
