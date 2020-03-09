"use strict";

import Dispatcher from "../dispatcher/appDispatcher";
import axios from "axios";
import Promise from "es6-promise";

import config from "../config";

const URL = config.url;

const BookingActions = {
  createTravelers(travelers) {
    Dispatcher.dispatch({
      actionType: "booking_travelers_started"
    });

    const promises = [];

    //Get traveler IDs
    //Iterate through travelers and attempt to insert, if fails, asume due to email constraint and make request to get traveler by email
    travelers.map(function(traveler) {
      const promise = new Promise(function(resolve, reject) {
        axios
          .post(`${URL}/api/counter/travelers`, traveler)
          .then(result => {
            traveler.id = result.data;
            return resolve();
          })
          .catch(() => {
            axios
              .post(`${URL}/api/counter/travelers/search`, {
                email: traveler.email
              })
              .then(result => {
                traveler.id = result.data[0].id;
                return resolve();
              })
              .catch(error => {
                return reject(error);
              });
          });
      });

      promises.push(promise);
    });

    Promise.all(promises)
      .then(function() {
        Dispatcher.dispatch({
          actionType: "booking_travelers_successful",
          data: travelers
        });
      })
      .catch(function(error) {
        console.log(error);
        Dispatcher.dispatch({
          actionType: "booking_travelers_failure",
          error: error.toString()
        });
      });
  }
};

export default BookingActions;
