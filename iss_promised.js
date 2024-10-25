const needle = require("needle");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  return needle('get', 'https://api.ipify.org/?format=json')
    .then((response) => {
      const body = response.body;
      const ip = body.ip;
      return ip;
    });
};

const fetchCoordsByIP = function(ip) {
  return needle('get', `http://ipwho.is/${ip}`)
    .then((response) => {
      const body = response.body;
      const geolocation = { latitude: body.latitude, longitude: body.longitude };
      return geolocation;
    });
};

const fetchISSFlyOverTimes = function(geolocation) {
  return needle('get', `https://iss-flyover.herokuapp.com/json/?lat=${geolocation.latitude}&lon=${geolocation.longitude}`)
    .then((response) => {
      const body = response.body;
      const passTimes = body.response;
      return passTimes;
    });
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((geolocation) => fetchISSFlyOverTimes(geolocation))
    .then((passTimes) => {
      return passTimes;
    });
};

module.exports = { nextISSTimesForMyLocation };