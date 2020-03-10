'use strict'
import React from 'react';
import {Link} from '@reach/router';
import PropTypes from 'prop-types';
import TravelerActions from '../actions/travelerActions';
import { Table } from 'react-bootstrap';
export class TravelerComponent extends React.Component{

    componentDidMount(){
        TravelerActions.readTravelers();
    }
    createTravelerRow(traveler){
        return (
            <tr key={traveler.id}>
                <td> {traveler.id}</td>
                <td> {traveler.first_name} </td>
                <td> {traveler.last_name} </td>
                <td> {traveler.dob} </td>
                <td> {traveler.phone} </td>
                <td> {traveler.email} </td>
                <td> {traveler.country} </td>
                <td> {traveler.state} </td>
                <td> {traveler.city} </td>
                <td> <Link to={`/itineraries/travelers/${traveler.id}`} onClick={()=>this.props.changeSearchTravelerItinerary(traveler.id)} replace>Update</Link></td>
            </tr>
        );
    }
    render(){
        let content = '';
        if(this.props.traveler.readState.pending)
        {
            content =  (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }
        if(this.props.traveler.readState.success)
        {
            content = (
                <Table striped bordered hover size="md">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Account</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.traveler.travelerList.map(this.createTravelerRow, this)}
                    </tbody>
                </Table>
            );
        }

        if(this.props.traveler.readState.failure)
        {
            content =
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading travelers!
                </div>
            );
        }
        return content;
    }
}

TravelerComponent.propTypes={
    traveler: PropTypes.object.isRequired,
    changeSearchTravelerItinerary: PropTypes.func.isRequired
}