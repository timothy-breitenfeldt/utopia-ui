"use strict";

import Dispatcher from "../dispatcher/appDispatcher";
import axios from "axios";

import config from "../config";

export default class LoginActions {
  constructor() {
    this.url = config.url;
  }

  login(email, password) {
    Dispatcher.dispatch({
      actionType: "login_started"
    });
    const credentials = { email: email, password: password };

    axios
      .post(`${this.url}/account`, credentials)
      .then(result => {
        Dispatcher.dispatch({
          actionType: "login_successful",
          data: result.data
        });
      })
      .catch(error => {
        Dispatcher.dispatch({
          actionType: "login_failure",
          error: error
        });
      });
  }
}
