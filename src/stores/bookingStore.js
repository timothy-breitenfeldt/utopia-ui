"use strict";

import Dispatcher from "../dispatcher/appDispatcher";
import { EventEmitter } from "events";

import * as bookingFactory from "../factories/bookingFactory";

class AccountStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.CHANGE_EVENT = "change";

    this.store = {
      booking: bookingFactory.getBookingStateObject()
    };
  }

  addChangeListener(callback) {
    this.on(this.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(this.CHANGE_EVENT);
  }

  updateBookingState() {
    return this.store.booking;
  }

  resetTravelersState() {
    this.store.booking.error = "";
    this.store.booking.travelerState = {
      pending: false,
      failure: false,
      success: false
    };
  }
}

const bookingStore = new BookingStore();

Dispatcher.register(action => {
  switch (action.actionType) {
    case "booking_travelers_started":
      bookingStore.resetTravelersState();
      bookingStore.store.booking.travelerState.pending = true;
      bookingStore.emitChange();
      break;
    case "booking_travelers_successful":
      bookingStore.resetTravelersState();
      bookingStore.store.booking.travelerState.success = true;

      bookingStore.emitChange();
      break;
    case "booking_travelers_failure":
      bookingStore.resetTravelersState();
      bookingStore.store.booking.travelerState.failure = true;
      bookingStore.store.booking.error = action.error;
      bookingStore.emitChange();
      break;
  }
});

export default bookingStore;
