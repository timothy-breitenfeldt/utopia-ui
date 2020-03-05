import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios';

const TicketActions = {
    readTicketsByItineraryId: function(id){
        Dispatcher.dispatch({
            actionType: 'read_tickets_started'
        });
        axios.get(`http://localhost:8081/api/counter/itineraries/${id}/tickets`)
        .then( res => {
            Dispatcher.dispatch({
                actionType: 'read_tickets_successful',
                data:  res.data
            });
        })
        .catch((error)=> {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_tickets_failure'
            });
        });
    }
}

module.exports = TicketActions;