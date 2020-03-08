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

export function getTicketObject() {
  return {
    seat_number: "",
    flight_number: 0,
    price: 0
  };
}
