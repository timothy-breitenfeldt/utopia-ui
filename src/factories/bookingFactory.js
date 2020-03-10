"use strict";

export function getBookingStateObject() {
  return {
    travelers: [],
    itineraries: [],
    bookingState: {
      pending: false,
      failure: false,
      success: false
    },
    error: ""
  };
}
