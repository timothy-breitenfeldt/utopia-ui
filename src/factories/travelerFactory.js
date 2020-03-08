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

export function getTravelerObject() {
  return {
    first_name: "",
    last_name: "",
    dob: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postal_code: ""
  };
}
