'use strict'
import React from 'react';
import PropTypes from 'prop-types';
import TicketActions from '../actions/ticketActions';
export class ItineraryPage extends React.Component{

    componentDidMount(){
        TicketActions.readTicketsByItineraryId(this.props.itineraryId);
    }
    createTicketRow(ticket){
        return (
            <tr key={ticket.id}>
                <td> {ticket.id}</td>
                <td> {ticket.status} </td>
                <td> {ticket.seat_number} </td>
                <td> {ticket.flight.id} </td>
                <td> {ticket.flight.dest_airport.name} </td>
                <td> {ticket.flight.departure_date} </td>
                <td> {ticket.flight.origin_airport.name} </td>
                <td> Settings </td>
            </tr>
        );
    }
    render(){
        let content = '';
        if(this.props.ticket.readState.pending)
        {
            content =  (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }
        if(this.props.ticket.readState.success)
        {
            content = (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Ticket</th>
                            <th>Status</th>
                            <th>Seat Number</th>
                            <th>Flight Number</th>
                            <th>To</th>
                            <th>Departure Date</th>
                            <th>From</th>
                            <th>Settings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.ticket.ticketList.map(this.createTicketRow, this)}
                    </tbody>
                </table>
            );
        }

        if(this.props.ticket.readState.failure)
        {
            content =
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading Itineraries!
                </div>
            );
        }
        return content;
    }
}

ItineraryPage.propTypes={
    itineraryId: PropTypes.number.isRequired,
    ticket: PropTypes.object.isRequired
}