"use strict";

export function getItineraryStateObject() {
  return {
    itineraryList: [],
    readState: {
      pending: false,
      success: false,
      failure: false
    }
  };
}
