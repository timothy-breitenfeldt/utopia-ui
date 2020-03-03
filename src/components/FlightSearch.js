'use strict'

import React from 'react';
// import Moment from 'moment';
import Axios from 'axios';
import {InputGroup, Form, FormControl, Button} from "react-bootstrap";

export class FlightSearch extends React.Component {

  constructor(props) {
    super(props)

    this.airports = [
      'IAD',
      'DCA',
      'BWI'
    ],

    this.state = {
      to         : '',
      from       : '',
      depart     : '',
      return     : '',
      oneWay     : true,
      passengers : 1
    }

    this.toOnChange         = this.toOnChange.bind(this);
    this.fromOnChange       = this.fromOnChange.bind(this);
    this.submitSearch       = this.submitSearch.bind(this);
    this.radioOnChange      = this.radioOnChange.bind(this);
    this.departOnChange     = this.departOnChange.bind(this);
    this.returnOnChange     = this.returnOnChange.bind(this);
    this.passengersOnChange = this.passengersOnChange.bind(this);
  }

  componentDidMount() {
    console.log("MOUNTED");
    var bodyFormData = new FormData();
    bodyFormData.set('userName', 'Fred');
    Axios.post(`https://v2z3jctj5b.execute-api.us-east-1.amazonaws.com/PROD/api/counter/flights/search`,
      {
        "capacity": 41,
        "price": 63.0,
        "arrival_date": "2019-04-06",
        "departure_date": "2019-11-06"
      })
        .then( res => {
          let flights = res.data;
          console.log(flights);
        })
        .catch( error => {
          console.log(error);
        });
  }

  radioOnChange() {
    this.setState( prevState => ({
      oneWay: !prevState.oneWay
    }));
  }

  passengersOnChange(e) {
    this.setState({ passengers: e.target.value });
  }

  fromOnChange(e) {
    this.setState({ from: e.target.value });
  }

  toOnChange(e) {
    this.setState({ to: e.target.value });
  }

  departOnChange(e) {
    this.setState({ depart: e.target.value });
  }

  returnOnChange(e) {
    this.setState({ return: e.target.value });
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
              placeholder="YYYY-MM-DD"
              aria-label="Return"
              aria-describedby="return-label"
              onChange={this.returnOnChange}
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
              inline checked={this.state['oneWay']}
              label="One way"
              name="one-way-radio"
              type="radio"
              id="one-way-radio"
              style={{paddingLeft: "10px"}}
              onChange={this.radioOnChange}/>
            <Form.Check
              inline checked={!this.state['oneWay']}
              label="Round trip"
              name="round-trip-radio"
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
                onChange={this.fromOnChange}
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
                onChange={this.toOnChange}
              />
            </InputGroup>
          </Form.Row>
          <Form.Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="depart-label" style={{width: '115px'}}>Depart</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="YYYY-MM-DD"
                aria-label="Depart"
                aria-describedby="depart-label"
                onChange={this.departOnChange}
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
