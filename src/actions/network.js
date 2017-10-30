import { NETWORK_CONNECTION_ERROR } from "./types";

export function networkConnectionError(error) {
  return {
    type: NETWORK_CONNECTION_ERROR,
    error
  };
}
