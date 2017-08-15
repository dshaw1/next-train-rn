export default (journeyArrayHelper = data => {
  if (data) {
    const steps = data.journey.routes[0].legs[0].steps;

    return steps.map(item => {
      if (item.travel_mode === "WALKING") {
        return {
          distance: item.distance,
          html_instructions: item.html_instructions,
          travel_mode: item.travel_mode
        };
      } else {
        return {
          distance: item.distance,
          html_instructions: item.html_instructions,
          transit_details: {
            arrival_time: item.transit_details.arrival_time,
            arrival_stop: item.transit_details.arrival_stop.name,
            departure_time: item.transit_details.departure_time,
            departure_stop: item.transit_details.departure_stop.name,
            line: {
              vehicle: item.transit_details.line.vehicle,
              short_name: item.transit_details.line.short_name
            }
          },
          travel_mode: item.travel_mode
        };
      }
    });
  }
});
