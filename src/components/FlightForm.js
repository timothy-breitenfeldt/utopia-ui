/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';

export class FlightForm extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        id: this.props.flight.id,
        destination: this.props.flight.dest_airport,
        origin: this.props.flight.origin_airport,
        capacity: this.props.flight.capacity,
        price: this.props.flight.price,
        departure_date: this.props.flight.departure_date,
        arrival_date: this.props.flight.arrival_date
      }
    }

    render(){
      let content = '';
      content = (
        <tr key={this.props.flight.id}>
          <td> {this.props.flight.id} </td>
          <td> {this.props.flight.dest_airport.name} </td>
          <td> {this.props.flight.origin_airport.name} </td>
          <td> {this.props.flight.capacity} </td>
          <td> {this.props.flight.price} </td>
          <td> {this.props.flight.departure_date} </td>
          <td> {this.props.flight.arrival_date} </td>
        </tr>
      );
      return content;
    }
}

FlightForm.PropTypes = {
    flight: PropTypes.object.isRequired
}
