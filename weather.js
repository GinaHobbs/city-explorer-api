'use strict';
const axios = require('axios');
const Forecast = require('./Forecast.js');

async function getWeather (req,res) {
  //47.6062° N, 122.3321° W
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I`

  try {
    const result = await axios.get(url);
    // console.log(result.data);
    let data = result.data.data.map(weather => {
      // console.log(weather);
      let weatherObj = new Forecast(weather.datetime, weather.weather.description);
      return weatherObj;
    })
    res.status(200).send(data);
  } catch(err) {
    console.error('error info: ', err);
  }
}

module.exports = getWeather;