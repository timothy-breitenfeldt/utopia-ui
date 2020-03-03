"use strict";

export function getLoginStateObject() {
  return {
    user: {
      email: "",
      role: "",
      first_name: "",
      last_name: "",
      dob: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      country: "",
      postal_code: ""
    },
    authenticationState: {
      pending: false,
      failure: false,
      success: false
    },
    error: ""
  };
}
