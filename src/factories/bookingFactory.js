"use strict";

export function getBookingStateObject() {
  return {
    travelers: [],
    itineraries: [],
    travelerState: {
      pending: false,
      failure: false,
      success: false
    },
    error: ""
  };
}
