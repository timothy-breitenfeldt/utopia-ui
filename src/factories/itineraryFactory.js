"use strict";

export function getItineraryStateObject() {
  return {
    itineraryList: [],
    itineraryId:0,
    readState: {
      pending: false,
      success: false,
      failure: false
    }
  };
}