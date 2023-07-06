const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP('your_IP_address_here', (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('Coordinates:', data);
// });

const coords = {
  latitude: '49.27670',
  longitude: '-123.13000',
};

// fetchISSFlyOverTimes(coords, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('Fly Over Times:', data);
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  for (const passTime of passTimes) {
    const datetime = new Date(passTime.risetime * 1000);
    console.log(`Next pass at ${datetime} for ${passTime.duration} seconds!`);
  }
});
