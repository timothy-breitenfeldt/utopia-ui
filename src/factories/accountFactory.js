"use strict";

export function getAccountStateObject() {
  return {
    redirectToLogin: false,
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
    loginState: {
      pending: false,
      failure: false,
      success: false
    },
    registrationState: {
      pending: false,
      failure: false,
      success: false
    },
    error: ""
  };
}
