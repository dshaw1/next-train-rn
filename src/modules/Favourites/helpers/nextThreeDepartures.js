export default (nextThreeDepartures = (fetchJourney, data, newTime) => {
  const nextDepartures = [];
  const departTime = res => {
    return res.journey.routes[0].legs[0].departure_time;
  };
  const arrivTime = res => {
    return res.journey.routes[0].legs[0].arrival_time;
  };

  // Adding 60 seconds to each received departure_time
  return new Promise((resolve, reject) => {
    fetchJourney(data, newTime)
      .then(res => {
        nextDepartures.push({
          departure_time: departTime(res),
          arrival_time: arrivTime(res)
        });

        const time2 = res.journey.routes[0].legs[0].departure_time.value + 60;
        fetchJourney(data, time2).then(res => {
          nextDepartures.push({
            departure_time: departTime(res),
            arrival_time: arrivTime(res)
          });

          const time3 = res.journey.routes[0].legs[0].departure_time.value + 60;
          fetchJourney(data, time3).then(res => {
            nextDepartures.push({
              departure_time: departTime(res),
              arrival_time: arrivTime(res)
            });
            return resolve({
              nextDepartures
            });
          });
        });
      })
      .catch(err => {
        reject(err);
      });
  });
});
