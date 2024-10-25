// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('64.180.115.139', (error, geolocation) => {
//   if (error) {
//     console.log("It didn't work!", error)
//     return;
//   }
//   console.log('It worked!', geolocation)
// })

// fetchISSFlyOverTimes({ latitude: 49.2193226, longitude: -122.598398 }, (error, flyOverTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned fly over times:', flyOverTimes);
// });