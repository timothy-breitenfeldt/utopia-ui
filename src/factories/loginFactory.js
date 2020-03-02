"use strict";

export function getLoginStateObject() {
  return {
    user: null,
    authenticationState: {
      pending: false,
      failure: false,
      success: false
    },
    error: ""
  };
}
