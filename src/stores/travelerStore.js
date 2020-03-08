import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _travelerStore = {
    traveler:{
        travelerList: [],
        readState:{
            pending:false,
            success:false,
            failure:false
        },
        error: ''
    }
};

class TravelerStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAlltravelers(){
        return _travelerStore.traveler;
    }

    resetReadState(){
        _travelerStore.traveler.readState = {
            pending:false,
            success:false,
            failure:false
          }
    }
}

const TravelerStore = new TravelerStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_travelers_successful':
            TravelerStore.resetReadState();
            _travelerStore.traveler.travelerList = action.data;
            _travelerStore.traveler.readState.success = true;
            TravelerStore.emitChange();
            break;
        case 'read_travelers_failure':
            TravelerStore.resetReadState();
            _travelerStore.traveler.readState.failure = true;
            TravelerStore.emitChange();
            break;
        case 'read_travelers_started':
            TravelerStore.resetReadState();
            _travelerStore.traveler.readState.pending = true;
            TravelerStore.emitChange();
            break;
        case 'add_travelers_started':
            TravelerStore.resetReadState();
            _travelerStore.traveler.readState.pending = true;
            TravelerStore.emitChange();
            break;
        case 'add_travelers_successful':
            TravelerStore.resetReadState();
            _travelerStore.traveler.travelerList = action.data;
            _travelerStore.traveler.readState.success = true;
            TravelerStore.emitChange();
            break;
        case 'add_travelers_failure':
            TravelerStore.resetReadState();
            _travelerStore.traveler.readState.failure = true;
            TravelerStore.emitChange();
            break;
        default:
            return;
    }
} );

export default TravelerStore;