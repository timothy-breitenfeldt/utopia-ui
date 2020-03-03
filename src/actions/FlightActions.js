import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios';

const FlightActions = {
    readFlights: function(flight){
        Dispatcher.dispatch({
            actionType: 'read_flights_started'
        });
        axios.post(`http://localhost:8081/api/counter/flights/search`,{"id":flight.id, "capacity":flight.capacity, "price":flight.price, 
        "arrival_date":flight.arrival_date, "dest_airport":flight.dest_airport, "origin_airport":flight.origin_airport})
        .then( res => {
            Dispatcher.dispatch({
                actionType: 'read_flights_successful',
                data:  res.data
            });
        })
        .catch((error)=> {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_flights_failure'
            });
        });
    }
}

module.exports = FlightActions;