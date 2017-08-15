// Request a Google developer API key if you do not already have one
import API_KEY from "./api_key";

const googleEndPoint = "https://maps.googleapis.com/maps/api/directions/json";

export function searchJourney(depart, arriv, time) {
  return `${googleEndPoint}?origin=${depart}&destination=${arriv}&mode=transit&transit_mode=train&departure_time=${time}&transit_routing_preference=less_walking&key=${API_KEY}`;
}
