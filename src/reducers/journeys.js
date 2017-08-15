import {
  REQUEST_JOURNEY,
  RECEIVE_JOURNEY,
  FETCH_JOURNEY_ERROR,
  RECEIVE_JOURNEY_ERROR,
  TOGGLE_EDITING
} from "../actions/types";

const initialState = {
  editing: false,
  newJourney: {
    journey: [],
    start: "",
    finish: "",
    errors: {}
  }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_EDITING:
      return Object.assign({}, state, {
        editing: !state.editing
      })
    case REQUEST_JOURNEY:
      return {};
    case RECEIVE_JOURNEY:
      return Object.assign({}, state, {
        newJourney: {
          journey: action.journey,
          start: action.depart,
          finish: action.arriv,
          errors: {},
          isLoading: false
        }
      });
    case FETCH_JOURNEY_ERROR:
      return Object.assign({}, state, {
        newJourney: {
          errors: action.error.message,
          isLoading: false
        }
      });
    case RECEIVE_JOURNEY_ERROR:
      return Object.assign({}, state, {
        newJourney: {
          errors: action.error,
          isLoading: false
        }
      });
    default:
      return state;
  }
};
