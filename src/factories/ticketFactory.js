"use strict";

export function getTicketStateObject() {
  return {
    ticketList: [],
    readState: {
      pending: false,
      success: false,
      failure: false
    },
    error: ""
  };
}
