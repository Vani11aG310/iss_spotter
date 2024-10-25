/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const needle = require('needle');
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  needle.get('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = body.ip;

    return (null, ip);
  });
};
const fetchCoordsByIP = function(ip, callback) {
  // use request to fetch geolocation from IPWHOIS API
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (!body.success) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(message), null);
      return;
    }

    const geolocation = { latitude: body.latitude, longitude: body.longitude };
    return (null, geolocation);
  });
};
const fetchISSFlyOverTimes = function(coords, callback) {
  console.log(coords);
  needle.get(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const message = `Status Code ${response.statusCode} when fetching fly over times. Response: ${body}`;
      callback(Error(message), null);
      return;
    }

    const flyOverTimes = body.response;
    callback(null, flyOverTimes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, geolocation) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(geolocation, (error, data) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, data);
      });
    });
  });
};
module.exports = { nextISSTimesForMyLocation };