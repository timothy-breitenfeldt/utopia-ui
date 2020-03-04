'use strict'

import React from 'react';
import PropTypes from 'prop-types';
import FlightStore from '../stores/flightStore';
import Table from 'react-bootstrap/Table';

export class FlightList extends React.Component{

  constructor(props) {

    super(props)
    this.state = {
      flight:{
        flightList: [],
        readState:{
            pending:false,
            success:false,
            failure:false
        },
        error: ''
      }
    }
  }

  createFlightRow(flight){
    return (
      <tr key={flight.id}>
        <td style={{textAlign: 'center'}}>{flight.id}</td>
        <td style={{textAlign: 'center'}}>{flight.origin_airport.name}</td>
        <td style={{textAlign: 'center'}}>{flight.departure_date}</td>
        <td style={{textAlign: 'center'}}>{flight.dest_airport.name}</td>
        <td style={{textAlign: 'center'}}>{flight.arrival_date}</td>
      </tr>
    );
  }

  componentDidMount(){
    FlightStore.addChangeListener(this._onFlightChange.bind(this));
  }

  componentWillUnmount(){
    FlightStore.removeChangeListener(this._onFlightChange.bind(this));
  }

  _onFlightChange(){
    this.setState({ flight: FlightStore.getAllflights() });
  }

  render() {

    let content = '';

    if(this.state.flight.readState.pending){
      content = (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>)
    }

    if(this.state.flight.readState.success){
      content = (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th style={{textAlign: 'center'}}>Flight No</th>
              <th style={{textAlign: 'center'}}>Departing</th>
              <th style={{textAlign: 'center'}}>On</th>
              <th style={{textAlign: 'center'}}>Arriving</th>
              <th style={{textAlign: 'center'}}>At</th>
            </tr>
          </thead>
          <tbody>
            {this.state.flight.flightList.map(this.createFlightRow, this)}
          </tbody>
        </Table>)
    }

    if(this.state.flight.readState.failure){
      content = (
        <div className="alert alert-danger" role="alert">
          Error while loading flights!
        </div>)
    }

    return(
      <div>
        {content}
      </div>
    );
  }
}

FlightList.propTypes = {
  query: PropTypes.object.isRequired
};
