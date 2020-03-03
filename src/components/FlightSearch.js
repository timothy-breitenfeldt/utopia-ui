'use strict'

import React from 'react';
import Moment from 'moment';
import {InputGroup, Form, FormControl, Button} from "react-bootstrap";

console.log(Moment.now());

export class FlightSearch extends React.Component {

  constructor(props) {
    super(props)

    this.airports = [
      'IAD',
      'DCA',
      'BWI'
    ],

    this.state = {
      oneWay: true,
      passengers: 1,
      from: '',
      to: '',
      depart: '',
      return: ''
    }

    this.radioOnChange = this.radioOnChange.bind(this);
    this.passengersOnChange = this.passengersOnChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  radioOnChange() {
    this.setState( prevState => ({
      oneWay: !prevState.oneWay
    }));
  }

  passengersOnChange(e) {
    this.setState({ passengers: e.target.value });
  }

  submitSearch(e) {
    console.log(this.state);    
    e.preventDefault();
  }

  render() {

    let returnDate = '';

    if( !this.state.oneWay ){
      returnDate = (
        <Form.Row>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="return-label" style={{width: '115px'}}>Return</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Return date"
              aria-label="Return"
              aria-describedby="return-label"
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
          <Form.Row>
            <Form.Check
              inline checked={this.state['oneWay']}
              label="One way"
              name="one-way-radio"
              type="radio"
              id="one-way-radio"
              onChange={this.radioOnChange}/>
            <Form.Check
              inline checked={!this.state['oneWay']}
              label="Round trip"
              name="round-trip-radio"
              type="radio"
              id="round-trip-radio"
              onChange={this.radioOnChange}/>
          </Form.Row>
          <Form.Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="passengers-label" style={{width: '115px'}}>Passengers</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as="select" onChange={this.passengersOnChange}>
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
                <InputGroup.Text id="from-label" style={{width: '115px'}}>From</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="City or airport code"
                aria-label="From"
                aria-describedby="from-label"
              />
            </InputGroup>
          </Form.Row>
          <Form.Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="to-label" style={{width: '115px'}}>To</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="City or airport code"
                aria-label="To"
                aria-describedby="to-label"
              />
            </InputGroup>
          </Form.Row>
          <Form.Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="depart-label" style={{width: '115px'}}>Depart</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Departure date"
                aria-label="Depart"
                aria-describedby="depart-label"
              />
            </InputGroup>
          </Form.Row>
          {returnDate}
          <Button variant="dark" type="submit" value="Submit">Search</Button>
        </Form>
      </div>
    )
  }
}
