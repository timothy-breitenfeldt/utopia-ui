"use strict";

import Dispatcher from "../dispatcher/appDispatcher";
import axios from "axios";
import config from "../config";

const URL = config.url;

const BookingActions = {
  createTravelers(travelers) {
    Dispatcher.dispatch({
      actionType: "booking_travelers_started"
    });

    const promises = [];
    const travelerIds = [];

    travelers.map(function(traveler) {
      const createTravelerPromise = axios.post(
        `${url}/api/counter/travelers`,
        traveler
      );
      promises.push(createTravelerPromise);

      createTravelerPromise
        .then(result => travelerIds.push(result.id))
        .catch(error => {
          const getTravelerPromise = axios.post(
            `${url}/api/counter/travelers/search`,
            {
              email: traveler.email
            }
          );
          promises.push(getTravelerPromise);

          getTravelerPromise.then(result => travelerIds.push(result.id));
        });
    });

    Promise.all(promises)
      .then(function(result) {
        Dispatcher.dispatch({
          actionType: "booking_travelers_successful",
          data: travelerIds
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
