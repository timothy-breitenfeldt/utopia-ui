"use strict"
import React from 'react';
import PropType from 'prop-types';
import FlightActions from '../actions/FlightActions';
export class FlightPage extends React.Component{

    constructor(props){
        super(props);
        this.handleArrivalChange = this.handleArrivalChange.bind(this);
        this.handleDepartureChange = this.handleDepartureChange.bind(this);
        this.handleDestinationChange = this.handleDestinationChange.bind(this);
        this.handleOriginChange = this.handleOriginChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);

        this.state ={
            searchList:[],
           searchTarget:{
                id:null,
                dest_airport:null,
                origin_airport:null,
                capacity:null,
                price:null,
                departure_date:null,
                arrival_date:null
           } 
        }
    }
    //handle change events
    handleDestinationChange(event){
        this.setState({searchTarget:{dest_airport: event.target.value}});
    }
    handleOriginChange(event){
        this.setState({searchTarget:{origin_airport: event.target.value}});
    }
    handleDepartureChange(event){
        this.setState({searchTarget:{departure_date: event.target.value}});
    }
    handleArrivalChange(event){
        this.setState({searchTarget:{arrival_date: event.target.value}});
    }
    handlePriceChange(event){
        this.setState({searchTarget:{price: event.target.value}});
    }
    //create row
    createFlightRow(flight){  
            return (
                <tr key={flight.id}>
                    <td> {flight.id} </td>
                    <td> {flight.dest_airport.name} </td>
                    <td> {flight.origin_airport.name} </td>
                    <td> {flight.capacity} </td>
                    <td> {flight.price} </td>
                    <td> {flight.departure_date} </td>
                    <td> {flight.arrival_date} </td>
                </tr>
            );
    }
    componentDidMount(){
        FlightActions.readFlights(this.state.searchTarget);
    }
    render(){   
         let content = '';
         //LIST OF FLIGHTS
         if(this.props.flight.readState.pending){
             content = (
                 <div className="d-flex justify-content-center">
                     <div className="spinner-border" role="status">
                         <span className="sr-only">Loading...</span>
                     </div> 
                 </div>
             );
         }
         if(this.props.flight.readState.success){
            content = (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Flight Number</th>
                            <th>Destination Airport</th>
                            <th>Origin Airport</th>
                            <th>Capacity</th>
                            <th>Price</th>
                            <th>Departure Date</th>
                            <th>Arrival Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.flight.flightList.map(this.createFlightRow, this)}
                    </tbody>    
                </table>)
        }
        if(this.props.flight.readState.failure){
            content = (
                <div className="alert alert-danger" role="alert">
                    Error while loading flights!
                </div>
            )
        }
        //Search Form
        let searchContent=(
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>
                                    Destination: <input type="text" value={this.state.dest_airport} onChange={this.handleDestinationChange}/>
                                </label>
                            </td>
                            <td>
                                <label>
                                    Origin: <input type="text" value={this.state.origin_airport} onChange={this.handleOriginChange} form="addForm"/>
                                </label>
                            </td>
                            <td>
                                <label>
                                    Departure: <input type="date" value={this.state.departure_date} onChange={this.handleDepartureChange}/>
                                </label>
                            </td>
                            <td>
                                <label>
                                    Arrival: <input type="date" value={this.state.arrival_date} onChange={this.handleArrivalChange}/>
                                </label>
                            </td>
                            <td>
                                <label>
                                    Price: <input type="number" value={this.state.price} onChange={this.handlePriceChange}/>
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
        return(
            <div>
                <h1> Flights </h1>
                {searchContent}
                {content}
            </div>
        );  
    }

}

FlightPage.propTypes ={
    flight: PropType.object.isRequired
}