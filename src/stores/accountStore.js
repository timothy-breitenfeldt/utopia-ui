"use strict";

import Dispatcher from "../dispatcher/appDispatcher";
import { EventEmitter } from "events";
import Cookie from "js-cookie";

import * as accountFactory from "../factories/accountFactory";

class AccountStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.CHANGE_EVENT = "change";

    this.store = {
      account: accountFactory.getAccountStateObject()
    };
  }

  addChangeListener(callback) {
    this.on(this.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(this.CHANGE_EVENT);
  }

  updateaccount() {
    return this.store.account;
  }

  resetLoginState() {
    this.store.account.redirectToLogin = false;
    this.store.account.loginState = {
      pending: false,
      success: false,
      failure: false
    };
  }

  resetRegistrationState() {
    this.store.account.redirectToLogin = false;
    this.store.account.registrationState = {
      pending: false,
      success: false,
      failure: false
    };
  }

  resetLogoutState() {
    this.store.account.redirectToLogin = false;
    this.store.account.logoutState = {
      success: false
    };
  }

  resetUserData() {
    this.store.account.user = {
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
    };
  }

  setJwt(token) {
    Cookie.set("token", token);
  }

  removeJwt() {
    Cookie.remove("token");
  }
}

const accountStore = new AccountStore();

Dispatcher.register(action => {
  switch (action.actionType) {
    case "login_started":
      accountStore.resetLoginState();
      accountStore.store.account.error = "";
      accountStore.store.account.loginState.pending = true;
      accountStore.emitChange();
      break;
    case "login_failure":
      accountStore.resetLoginState();
      accountStore.store.account.loginState.failure = true;
      accountStore.store.account.error = action.error;
      accountStore.emitChange();
      break;
    case "login_successful":
      accountStore.resetLoginState();
      accountStore.store.account.loginState.success = true;
      accountStore.store.account.error = "";
      accountStore.store.account.user = action.data.user;
      accountStore.setJwt(action.data.token);
      accountStore.emitChange();
      break;
    case "registration_started":
      accountStore.resetRegistrationState();
      accountStore.store.account.error = "";
      accountStore.store.account.registrationState.pending = true;
      accountStore.emitChange();
      break;
    case "registration_failure":
      accountStore.resetRegistrationState();
      accountStore.store.account.registrationState.failure = true;
      accountStore.store.account.error = action.error;
      accountStore.emitChange();
      break;
    case "registration_successful":
      accountStore.resetRegistrationState();
      accountStore.store.account.registrationState.success = true;
      accountStore.store.account.error = "";
      accountStore.store.account.redirectToLogin = true;
      accountStore.emitChange();
      break;
    case "logout_successful":
      accountStore.resetLogoutState();
      accountStore.resetUserData();
      accountStore.removeJwt();
      accountStore.store.account.logoutState.success = true;
      accountStore.store.account.error = "";
      accountStore.store.account.redirectToLogin = true;
      accountStore.emitChange();
      break;
  }
});

export default accountStore;
