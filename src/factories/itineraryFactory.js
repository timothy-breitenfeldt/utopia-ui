"use strict";

export function getItineraryStateObject() {
  return {
    itineraryList: [],
    itineraryId: 0,
    readState: {
      pending: false,
      success: false,
      failure: false
    },
    error: ""
  };
}

export function getItineraryObject() {
  return {
    user_id: 0,
    agency_id: 0,
    traveler_id: 0,
    tickets: []
  };
}
