const { nextISSTimesForMyLocation } = require('./iss_promised');

const printFlyOverTimes = function(flyOverTimes) {
  console.log(flyOverTimes);
  for (const flyOver of flyOverTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(flyOver.risetime);
    const duration = flyOver.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printFlyOverTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message)
  })