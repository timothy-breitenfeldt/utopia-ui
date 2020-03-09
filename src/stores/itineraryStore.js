import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';
import { navigate } from "@reach/router";

const CHANGE_EVENT = 'change';

let _itineraryStore = {
    itinerary:{
        itineraryList: [],
        readState:{
            pending:false,
            success:false,
            failure:false
        },
        error: ''
    }
};

class ItineraryStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAllitineraries(){
        return _itineraryStore.itinerary;
    }

    resetReadState(){
        _itineraryStore.itinerary.readState = {
            pending:false,
            success:false,
            failure:false
          }
    }
}

const ItineraryStore = new ItineraryStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_itineraries_successful':
            ItineraryStore.resetReadState();
            _itineraryStore.itinerary.itineraryList = action.data;
            _itineraryStore.itinerary.readState.success = true;
            ItineraryStore.emitChange();
            break;
        case 'read_itineraries_failure':
            ItineraryStore.resetReadState();
            _itineraryStore.itinerary.readState.failure = true;
            ItineraryStore.emitChange();
            break;
        case 'read_itineraries_started':
            ItineraryStore.resetReadState();
            _itineraryStore.itinerary.readState.pending = true;
            ItineraryStore.emitChange();
            break;
        case 'add_itineraries_started':
            ItineraryStore.resetReadState();
            _itineraryStore.itinerary.readState.pending = true;
            ItineraryStore.emitChange();
            break;
        case 'add_itineraries_successful':
            ItineraryStore.resetReadState();
            _itineraryStore.itinerary.itineraryList = action.data;
            _itineraryStore.itinerary.readState.success = true;
            ItineraryStore.emitChange();
            break;
        case 'add_itineraries_failure':
            ItineraryStore.resetReadState();
            _itineraryStore.itinerary.readState.failure = true;
            ItineraryStore.emitChange();
            break;
        case 'delete_itineraries_succesful':
            ItineraryStore.resetReadState();
            navigate("/itineraries/update");
            ItineraryStore.emitChange();
            break;
        default:
            return;
    }
} );

export default ItineraryStore;