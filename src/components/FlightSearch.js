'use strict'

import React from 'react';
// import Moment from 'moment';
import PropTypes from 'prop-types';
import FlightList from './FlightList.js';
import FlightActions from '../actions/flightActions.js';

import {
  Form,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";

export default class FlightSearch extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      flight: {

        dest_airport : { name: "" },
        origin_airport      : { name: "" },
        departure_date      : null,
        return_date         : null,
        passengers          : 1,
        oneWay              : true,

      }
    }

    this.submitSearch       = this.submitSearch.bind(this);
    this.radioOnChange      = this.radioOnChange.bind(this);
    this.handleDestChange   = this.handleDestChange.bind(this);
    this.handleReturnChange = this.handleReturnChange.bind(this);
    this.handleOriginChange = this.handleOriginChange.bind(this);

  }

  radioOnChange() {
    this.setState( prevState => ({
      flight: {
        ...this.state.flight,
        oneWay: !prevState.flight.oneWay
      }
    }));
  }

  handleOriginChange() {
    this.setState({
      flight: {
        ...this.state.flight,
        origin_airport: { name: event.target.value}
      }
    })
  }

  handleDestChange() {
    this.setState({
      flight: {
        ...this.state.flight,
        dest_airport: { name: event.target.value }
      }
    })
  }

  handleReturnChange() {
    this.setState({
      flight: {
        ...this.state.flight,
        return_date: event.target.value
      }
    })
  }


  submitSearch() {
    event.preventDefault();
    console.log("SUBMITTING SEARCH");
    console.log(this.state.flight);
    FlightActions.readFlights(this.state.flight);
  }

  render() {

    let returnDate = '';

    if( this.state.flight.oneWay == false ){

      returnDate = (
        <Form.Row>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="return-label" style={{width: '115px'}}>Return</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="return_date"
              placeholder="YYYY-MM-DD"
              aria-label="Return"
              aria-describedby="return-label"
              onChange={this.handleReturnChange}
            />
          </InputGroup>
        </Form.Row>
      );
    }

    return(
      <div style={{
        width: "500px",
        marginLeft: "10px"
      }}>
        <Form onSubmit={this.submitSearch}>
          <hr></hr>
          <Form.Row>
            <Form.Check
              inline checked={this.state.flight.oneWay}
              style={{paddingLeft: "10px"}}
              label="One way"
              name="one-way-radio"
              type="radio"
              id="one-way-radio"
              onChange={this.radioOnChange}/>
            <Form.Check
              inline checked={!this.state.flight.oneWay}
              label="Round trip"
              name="one-way-radio"
              type="radio"
              id="round-trip-radio"
              onChange={this.radioOnChange}/>
          </Form.Row>
          <hr></hr>
          <Form.Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="passengers-label" style={{width: '115px'}}>Passengers</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as="select" name="passengers" onChange={this.handleFormChange}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5+</option>
              </Form.Control>
            </InputGroup>
          </Form.Row>
          <Form.Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="origin_airport-label" style={{width: '115px'}}>From</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="origin_airport"
                placeholder="City or airport code"
                aria-label="From"
                aria-describedby="origin_airport-label"
                onChange={this.handleOriginChange}
              />
            </InputGroup>
          </Form.Row>
          <Form.Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="to-label" style={{width: '115px'}}>To</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="destination_airport"
                placeholder="City or airport code"
                aria-label="To"
                aria-describedby="to-label"
                onChange={this.handleDestChange}
              />
            </InputGroup>
          </Form.Row>
          <Form.Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="depart-label" style={{width: '115px'}}>Depart</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="departure_date"
                placeholder="YYYY-MM-DD"
                aria-label="Depart"
                aria-describedby="depart-label"
                onChange={this.handleFormChange}
              />
            </InputGroup>
          </Form.Row>
          {returnDate}
          <Button variant="dark" type="submit" value="Submit">Search</Button>
        </Form>
        <hr></hr>
        <FlightList handleFlightSelect={this.props.handleFlightSelect}/>
      </div>
    )
  }
}

FlightSearch.propTypes = {
  handleFlightSelect: PropTypes.func.isRequired
};
