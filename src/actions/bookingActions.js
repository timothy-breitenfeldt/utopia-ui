"use strict";

import Dispatcher from "../dispatcher/appDispatcher";
import axios from "axios";
import Promise from "es6-promise";
import Cookie from "js-cookie";

import config from "../config";

const URL = config.url;
const HEADERS = { Authorization: `Bearer ${Cookie.get("token")}` };

const BookingActions = {
  async bookItineraries(travelers, itineraries) {
        const travelers = await this._createTravelers(travelers);

    //Copy traveler_id into itineraries and delete price_total
    for (int i = 0; i < travelers.length; i++) {
        this.props.booking.itineraries[i].traveler_id = travelers[i].traveler_id;
        delete this.props.booking.itineraries[i].price_total;
    }

    this._createItineraries(itineraries);
  },

  _createTravelers(travelers) {
    Dispatcher.dispatch({
      actionType: "booking_started"
    });

    const promises = [];

    //Get traveler IDs
    //Iterate through travelers and attempt to insert, if fails, asume due to email constraint and make request to get traveler by email
    travelers.map(function(traveler) {
      const promise = new Promise(function(resolve, reject) {
        axios
          .post(`${URL}/api/counter/travelers`, traveler, { headers: HEADERS })
          .then(result => {
            traveler.id = result.data;
            return resolve();
          })
          .catch(() => {
            axios
              .post(
                `${URL}/api/counter/travelers/search`,
                {
                  email: traveler.email
                },
                { headers: HEADERS }
              )
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

    return Promise.all(promises).catch(function(error) {
      console.log(error);
      Dispatcher.dispatch({
        actionType: "booking_failure",
        error: error.toString()
      });
    });
  },

  _createItineraries(itineraries) {
    const promises = [];

    for (let itinerary of itineraries) {
      let promise = axios.post(`${URL}/api/online/itineraries`, itinerary, {
        headers: HEADERS
      });
      promises.push(promise);
    }

    Promise.all(promises)
      .then(function() {
        Dispatcher.dispatch({
          actionType: "booking_successful"
        });
      })
      .catch(function(error) {
        console.log(error);
        Dispatcher.dispatch({
          actionType: "booking_failure",
          error: error.toString()
        });
      });
  }
};

export default BookingActions;
