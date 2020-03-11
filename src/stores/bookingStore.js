"use strict";

import Dispatcher from "../dispatcher/appDispatcher";
import { EventEmitter } from "events";

import * as bookingFactory from "../factories/bookingFactory";

class BookingStore extends EventEmitter {
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

  resetBookingsState() {
    this.store.booking.error = "";
    this.store.booking.bookingState = {
      pending: false,
      failure: false,
      success: false
    };
  }
}

const bookingStore = new BookingStore();

Dispatcher.register(action => {
  switch (action.actionType) {
    case "booking_started":
      bookingStore.resetBookingsState();
      bookingStore.store.booking.bookingState.pending = true;
      bookingStore.emitChange();
      break;
    case "booking_successful":
      bookingStore.resetBookingsState();
      bookingStore.store.booking.bookingState.success = true;
      bookingStore.emitChange();
      break;
    case "booking_failure":
      bookingStore.resetBookingsState();
      bookingStore.store.booking.bookingState.failure = true;
      bookingStore.store.booking.error = action.error;
      bookingStore.emitChange();
      break;
  }
});

export default bookingStore;
