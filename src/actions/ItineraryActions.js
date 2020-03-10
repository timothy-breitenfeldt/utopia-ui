import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios';
import Cookie from "js-cookie";

const ItineraryActions = {
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
    },
    readItinerariesOnline: function(){
        Dispatcher.dispatch({
            actionType: 'read_itineraries_started'
        });
        const HEADERS = { Authorization: `Bearer ${Cookie.get("token")}` };
        axios.get(`https://v2z3jctj5b.execute-api.us-east-1.amazonaws.com/PROD/api/online/itineraries`,{headers: HEADERS})
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
    },
    readItinerariesAgent: function(){
        Dispatcher.dispatch({
            actionType: 'read_itineraries_started'
        });
        axios.get(`https://v2z3jctj5b.execute-api.us-east-1.amazonaws.com/PROD/api/agent/itineraries`)
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
    },
    readTravelersItineraries: function(id){
        Dispatcher.dispatch({
            actionType: 'read_itineraries_started'
        });
        axios.get(`https://v2z3jctj5b.execute-api.us-east-1.amazonaws.com/PROD/api/counter/itineraries/travelers/${id}`)
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
    },
    deleteItinerary: function(id){
        Dispatcher.dispatch({
            actionType: 'read_itineraries_started'
        });
        axios.delete(`https://v2z3jctj5b.execute-api.us-east-1.amazonaws.com/PROD/api/counter/itineraries/${id}`)
        .then( () => {
            Dispatcher.dispatch({
                actionType: 'delete_itineraries_successful'
            })
        })
        .catch((error)=> {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_itineraries_failure'
            });
        });
    }
}

module.exports = ItineraryActions;