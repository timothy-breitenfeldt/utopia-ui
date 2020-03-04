import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios';

const ItineraryCounterActions = {
    readItinerariesCounter: function(){
        Dispatcher.dispatch({
            actionType: 'read_itineraries_started'
        });
        axios.get(`https://v2z3jctj5b.execute-api.us-east-1.amazonaws.com/PROD/api/counter/itineraries`)
        .then( res => {
            Dispatcher.dispatch({
                actionType: 'read_itineraries_successful',
                data:  res.data
            });
        })
        .catch((error)=> {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_itineraries_failure'
            });
        });
    }
}

module.exports = ItineraryCounterActions;