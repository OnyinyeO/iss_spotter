const request = require('request');

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, flyOverTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };

// const fetchMyIP = function (callback) {
//   request('https://api.ipify.org?format=json', (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }

//     if (response.statusCode !== 200) {
//       const errorMsg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(new Error(errorMsg), null);
//       return;
//     }

//     const ip = JSON.parse(body).ip;
//     callback(null, ip);
//   });
// };

// module.exports = { fetchMyIP };

// const fetchCoordsByIP = function (ip, callback) {
//   request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }

//     if (response.statusCode !== 200) {
//       const errorMsg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
//       callback(new Error(errorMsg), null);
//       return;
//     }

//     try {
//       const { latitude, longitude } = JSON.parse(body).data;
//       callback(null, { latitude, longitude });
//     } catch (error) {
//       callback(error, null);
//     }
//   });
// };

// const fetchISSFlyOverTimes = function (coords, callback) {
//   const { latitude, longitude } = coords;
//   const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

//   request(url, (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }

//     if (response.statusCode !== 200) {
//       const errorMsg = `Status Code ${response.statusCode} when fetching fly over times. Response: ${body}`;
//       callback(new Error(errorMsg), null);
//       return;
//     }

//     try {
//       const flyOverTimes = JSON.parse(body).response;
//       callback(null, flyOverTimes);
//     } catch (error) {
//       callback(error, null);
//     }
//   });
// };

// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
