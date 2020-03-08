import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios';

const TravelerActions = {
    readTravelers: function(){
        Dispatcher.dispatch({
            actionType: 'read_travelers_started'
        });
        axios.post("https://v2z3jctj5b.execute-api.us-east-1.amazonaws.com/PROD/api/counter/travelers/search", {})
        .then( res => {
            Dispatcher.dispatch({
                actionType: 'read_travelers_successful',
                data:  res.data
            });
        })
        .catch((error)=> {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_travelers_failure'
            });
        });
    },
    createTravelers: function(traveler){
        Dispatcher.dispatch({
            actionType: 'read_travelers_started'
        });
        axios.post("https://v2z3jctj5b.execute-api.us-east-1.amazonaws.com/PROD/api/counter/travelers/search", 
        {"first_name": traveler.first_name, "last_name":traveler.last_name, "dob": traveler.dob, "phone": traveler.phone, "email": traveler.email})
        .then( res => {
            Dispatcher.dispatch({
                actionType: 'read_travelers_successful',
                data:  res.data
            });
        })
        .catch((error)=> {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_travelers_failure'
            });
        });
    }
}

module.exports = TravelerActions;