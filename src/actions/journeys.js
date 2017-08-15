import axios from "axios";
import {
  REQUEST_JOURNEY,
  RECEIVE_JOURNEY,
  FETCH_JOURNEY_ERROR,
  RECEIVE_JOURNEY_ERROR,
  TOGGLE_EDITING
} from "./types";
import { searchJourney } from "../utils/api";

function requestJourney() {
  return {
    type: REQUEST_JOURNEY
  };
}

function receiveJourney(journey, depart, arriv, departStop, arrivStop, id) {
  return {
    type: RECEIVE_JOURNEY,
    journey,
    depart,
    arriv,
    departStop,
    arrivStop,
    id
  };
}

export function toggleEditing() {
  return {
    type: TOGGLE_EDITING
  };
}

function fetchJourneyError(error) {
  return {
    type: FETCH_JOURNEY_ERROR,
    error
  };
}

function receiveJourneyError(error) {
  return {
    type: RECEIVE_JOURNEY_ERROR,
    error
  };
}

export function fetchNewJourney(data, time) {
  const { depart, arriv, departStop, arrivStop, id } = data;
  return dispatch => {
    dispatch(requestJourney(depart, arriv));
    return axios
      .get(searchJourney(depart, arriv, time))
      .then(res => {
        if (res.data.status === "OK") {
          return dispatch(
            receiveJourney(res.data, depart, arriv, departStop, arrivStop, id)
          );
        } else {
          dispatch(receiveJourneyError(res.data.status));
        }
      })
      .catch(err => {
        return dispatch(fetchJourneyError(err));
      });
  };
}
