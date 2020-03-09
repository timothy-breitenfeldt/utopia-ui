import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _flightStore = {
    flight:{
        flightList: [],
        readState:{
            pending:false,
            success:false,
            failure:false
        },
        error: ''
    }
};

class FlightStoreClass extends EventEmitter{

    addChangeListener(cb){
      this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
      this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
      this.emit(CHANGE_EVENT);
    }

    getAllflights(){
      return _flightStore.flight;
    }

    resetReadState(){
      _flightStore.flight.readState = {
          pending:false,
          success:false,
          failure:false
        }
    }
}

const FlightStore = new FlightStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_flights_successful':
            FlightStore.resetReadState();
            console.log("FLIGHTSTORE");
            console.log(action.data);
            _flightStore.flight.flightList = action.data;
            _flightStore.flight.readState.success = true;
            FlightStore.emitChange();
            break;
        case 'read_flights_failure':
            FlightStore.resetReadState();
            _flightStore.flight.readState.failure = true;
            FlightStore.emitChange();
            break;
        case 'read_flights_started':
            FlightStore.resetReadState();
            _flightStore.flight.readState.pending = true;
            FlightStore.emitChange();
            break;
        case 'add_flights_started':
            FlightStore.resetReadState();
            _flightStore.flight.readState.pending = true;
            FlightStore.emitChange();
            break;
        case 'add_flights_successful':
            FlightStore.resetReadState();
            _flightStore.flight.flightList = action.data;
            _flightStore.flight.readState.success = true;
            FlightStore.emitChange();
            break;
        case 'add_flights_failure':
            FlightStore.resetReadState();
            _flightStore.flight.readState.failure = true;
            FlightStore.emitChange();
            break;
        default:
            return;
    }
} );

export default FlightStore;
