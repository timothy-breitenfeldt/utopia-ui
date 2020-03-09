import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios';

const FlightActions = {

  readFlights: function(flight){

    Dispatcher.dispatch({
      actionType: 'read_flights_started'
    });

    axios.post(`https://v2z3jctj5b.execute-api.us-east-1.amazonaws.com/PROD/api/counter/flights/search`, flight)
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
