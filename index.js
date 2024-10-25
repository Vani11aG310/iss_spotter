const { nextISSTimesForMyLocation } = require('./iss');

const printFlyOverTimes = function(flyOverTimes) {
  console.log(flyOverTimes);
  for (const flyOver of flyOverTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(flyOver.risetime);
    const duration = flyOver.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, flyOverTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printFlyOverTimes(flyOverTimes);
});