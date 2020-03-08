"use strict";

export function getTravelerStateObject() {
  return {
    travelerList: [],
    travelerId: 0,
    readState: {
      pending: false,
      success: false,
      failure: false
    },
    error: ""
  };
}
