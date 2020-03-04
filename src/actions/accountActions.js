"use strict";

import Dispatcher from "../dispatcher/appDispatcher";
import axios from "axios";

import config from "../config";

const URL = config.url;

const AccountActions = {
  login(email, password) {
    Dispatcher.dispatch({
      actionType: "login_started"
    });
    const credentials = { email: email, password: password };

    axios
      .post(`${URL}/api/account`, credentials)
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
  },

  register(user) {
    Dispatcher.dispatch({
      actionType: "registration_started"
    });

    axios
      .post(`${URL}/api/account/register`, user)
      .then(result => {
        Dispatcher.dispatch({
          actionType: "registration_successful",
          data: result.data
        });
      })
      .catch(error => {
        Dispatcher.dispatch({
          actionType: "registration_failure",
          error: error
        });
      });
  }
};

export default AccountActions;
