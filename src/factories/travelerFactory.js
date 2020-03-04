"use strict";

export function getTravelerStateObject() {
  return {
    travelerList: [],
    readState: {
      pending: false,
      success: false,
      failure: false
    }
  };
}
