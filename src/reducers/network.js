import { NETWORK_CONNECTION_ERROR } from "../actions/types";

const initialState = {
  networkError: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case NETWORK_CONNECTION_ERROR:
      return {
        networkError: action.error
      };
    default:
      return state;
  }
};
