const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function (passTimes) {
  for (const passTime of passTimes) {
    const datetime = new Date(passTime.risetime * 1000);
    console.log(`Next pass at ${datetime} for ${passTime.duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then(printPassTimes)
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
