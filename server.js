'use strict'

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const weatherData = require('./data/weather.json');
const Forecast = require('./Forecast.js');

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('server up'));

app.get('/weather', async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;
  console.log(searchQuery);

  const result = await weatherData.find(data => data.city_name === searchQuery)
    let data = result.data.map(weather => {
      console.log(weather);
      let newObj = new Forecast(weather.datetime, weather.weather.description);
      return newObj;
    })
    res.status(200).send(data);
})