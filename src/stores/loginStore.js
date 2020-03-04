"use strict";

import Dispatcher from "../dispatcher/appDispatcher";
import { EventEmitter } from "events";
import Cookie from "js-cookie";

import { getLoginStateObject } from "../factories/accountFactory";

class LoginStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.CHANGE_EVENT = "change";

    this.store = {
      loginState: getLoginStateObject()
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

  loggingIn() {
    return this.store.loginState;
  }

  resetLoginState() {
    this.store.loginState.authenticationState = {
      pending: false,
      success: false,
      failure: false
    };
  }

  setJwt(token) {
    Cookie.set("token", token);
  }
}

const loginStore = new LoginStore();

Dispatcher.register(action => {
  switch (action.actionType) {
    case "login_started":
      loginStore.resetLoginState();
      loginStore.store.loginState.error = "";
      loginStore.store.loginState.authenticationState.pending = true;
      loginStore.emitChange();
      break;
    case "login_failure":
      loginStore.resetLoginState();
      loginStore.store.loginState.authenticationState.failure = true;
      loginStore.store.loginState.error = action.error;
      loginStore.emitChange();
      break;
    case "login_successful":
      loginStore.resetLoginState();
      loginStore.store.loginState.authenticationState.success = true;
      loginStore.store.loginState.error = "";
      loginStore.store.loginState.user = action.data.user;
      loginStore.setJwt(action.data.token);
      loginStore.emitChange();
      break;
  }
});

export default loginStore;
