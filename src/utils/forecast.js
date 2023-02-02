const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=e9fbf5a6083e4914917142811232301&q=${latitude},${longitude}&days=10&aqi=yes&alerts=no&lang=en`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services!');
    } else if (body.error) {
      console.log('Unable to find location');
    } else {
      const { temp_c, precip_mm } = body.current;
      const { text } = body.forecast.forecastday[0].day.condition;
      callback(
        undefined,
        `${text}. It is currently ${temp_c} degrees out. There is a ${precip_mm} mm of rain`
      );
    }
  });
};

module.exports = forecast;
