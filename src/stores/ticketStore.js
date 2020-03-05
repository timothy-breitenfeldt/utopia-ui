import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _ticketStore = {
    ticket:{
        ticketList: [],
        readState:{
            pending:false,
            success:false,
            failure:false
        },
        error: ''
    }
};

class TicketStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAlltickets(){
        return _ticketStore.ticket;
    }

    resetReadState(){
        _ticketStore.ticket.readState = {
            pending:false,
            success:false,
            failure:false
          }
    }
}

const TicketStore = new TicketStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_tickets_successful':
            TicketStore.resetReadState();
            _ticketStore.ticket.ticketList = action.data;
            _ticketStore.ticket.readState.success = true;
            TicketStore.emitChange();
            break;
        case 'read_tickets_failure':
            TicketStore.resetReadState();
            _ticketStore.ticket.readState.failure = true;
            TicketStore.emitChange();
            break;
        case 'read_tickets_started':
            TicketStore.resetReadState();
            _ticketStore.ticket.readState.pending = true;
            TicketStore.emitChange();
            break;
        case 'add_tickets_started':
            TicketStore.resetReadState();
            _ticketStore.ticket.readState.pending = true;
            TicketStore.emitChange();
            break;
        case 'add_tickets_successful':
            TicketStore.resetReadState();
            _ticketStore.ticket.ticketList = action.data;
            _ticketStore.ticket.readState.success = true;
            TicketStore.emitChange();
            break;
        case 'add_tickets_failure':
            TicketStore.resetReadState();
            _ticketStore.ticket.readState.failure = true;
            TicketStore.emitChange();
            break;
        default:
            return;
    }
} );

export default TicketStore;