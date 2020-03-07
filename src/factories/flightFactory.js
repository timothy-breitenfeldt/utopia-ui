"use strict";

export function getFlightStateObject() {
  return {
    flightList: [],
    readState: {
      pending: false,
      success: false,
      failure: false
    },
    error: ""
  };
}
