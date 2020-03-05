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
      accountState: accountFactory.getAccountStateObject()
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

  updateAccountState() {
    return this.store.accountState;
  }

  resetLoginState() {
    this.store.accountState.redirectToLogin = false;
    this.store.accountState.loginState = {
      pending: false,
      success: false,
      failure: false
    };
  }

  resetRegistrationState() {
    this.store.accountState.redirectToLogin = false;
    this.store.accountState.registrationState = {
      pending: false,
      success: false,
      failure: false
    };
  }

  resetLogoutState() {
    this.store.accountState.redirectToLogin = false;
    this.store.accountState.logoutState = {
      success: false
    };
  }

  resetUserData() {
    this.store.accountState.user = {
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
      accountStore.store.accountState.error = "";
      accountStore.store.accountState.loginState.pending = true;
      accountStore.emitChange();
      break;
    case "login_failure":
      accountStore.resetLoginState();
      accountStore.store.accountState.loginState.failure = true;
      accountStore.store.accountState.error = action.error;
      accountStore.emitChange();
      break;
    case "login_successful":
      accountStore.resetLoginState();
      accountStore.store.accountState.loginState.success = true;
      accountStore.store.accountState.error = "";
      accountStore.store.accountState.user = action.data.user;
      accountStore.setJwt(action.data.token);
      accountStore.emitChange();
      break;
    case "registration_started":
      accountStore.resetRegistrationState();
      accountStore.store.accountState.error = "";
      accountStore.store.accountState.registrationState.pending = true;
      accountStore.emitChange();
      break;
    case "registration_failure":
      accountStore.resetRegistrationState();
      accountStore.store.accountState.registrationState.failure = true;
      accountStore.store.accountState.error = action.error;
      accountStore.emitChange();
      break;
    case "registration_successful":
      accountStore.resetRegistrationState();
      accountStore.store.accountState.registrationState.success = true;
      accountStore.store.accountState.error = "";
      accountStore.store.accountState.redirectToLogin = true;
      accountStore.emitChange();
      break;
    case "logout_successful":
      accountStore.resetLogoutState();
      accountStore.resetUserData();
      accountStore.removeJwt();
      accountStore.store.accountState.logoutState.success = true;
      accountStore.store.accountState.error = "";
      accountStore.store.accountState.redirectToLogin = true;
      accountStore.emitChange();
      break;
  }
});

export default accountStore;
