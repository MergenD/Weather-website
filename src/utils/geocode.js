const request = require('request');

const geocode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=315f0947db430880d98edbe324f3728e&query=${address}&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      return callback('Unable to connect to location services!', undefined);
    }
    if (!body.data) {
      return callback(
        'Unable to find location. Try another search!',
        undefined
      );
    } else {
      const { latitude = 0, longitude = 0, label = '' } = body.data[0];
      callback(undefined, {
        latitude,
        longitude,
        label,
      });
    }
  });
};

module.exports = geocode;
