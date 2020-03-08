'use strict'

import React from 'react';
import {Link} from '@reach/router';
import PropType from 'prop-types';
import ItineraryActions from '../actions/ItineraryActions';
export class ItinerariesTravelerPage extends React.Component{

    createItineraryRow(itinerary)
    {
        if(itinerary.agency != null){
            return (
                <tr key={itinerary.id}>
                    <td> {itinerary.id}</td>
                    <td> {itinerary.traveler.first_name} </td>
                    <td> {itinerary.traveler.last_name} </td>
                    <td> {itinerary.date_created} </td>
                    <td> $ {itinerary.price_total} </td>
                    <td> {itinerary.agency.name} </td>
                    <td> 
                        <Link to={`/itineraries/${itinerary.id}`} onClick={()=>this.props.updateSearchItinerary(itinerary.id)} replace>Settings</Link>
                    </td>
                </tr>
            );
        }

        else{
            return (
                <tr key={itinerary.id}>
                    <td> {itinerary.id}</td>
                    <td> {itinerary.traveler.first_name} </td>
                    <td> {itinerary.traveler.last_name} </td>
                    <td> {itinerary.date_created} </td>
                    <td> $ {itinerary.price_total} </td>
                    <td></td>
                    <td>   <Link to={`/itineraries/${itinerary.id}`} onClick={()=>this.props.updateSearchItinerary(itinerary.id)} replace>Settings</Link></td>
                </tr>
            );
        }
    }

    componentDidMount()
    {
        console.log()
        ItineraryActions.readTravelersItineraries(this.props.travelerId);
    }
    render(){
        let content = '';
        if(this.props.itinerary.readState.pending)
        {
            content =  (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }

        if(this.props.itinerary.readState.success)
        {
            content = (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Itinerary</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date Created</th>
                            <th>Price</th>
                            <th>Agency</th>
                            <th>Settings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.itinerary.itineraryList.map(this.createItineraryRow, this)}
                    </tbody>
                </table>
            );
        }

        if(this.props.itinerary.readState.failure)
        {
            content =
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading Itineraries!
                </div>
            );
        }
        
        return (
            <div>
                <h1>Itinerary</h1>
                {content}
            </div>
        );
    }
}

ItinerariesTravelerPage.propTypes ={
    itinerary: PropType.object.isRequired,
    updateSearchItinerary: PropType.func.isRequired,
    travelerId: PropType.number.isRequired
}