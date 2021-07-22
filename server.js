'use strict'

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const weatherData = require('./data/weather.json');
const Forecast = require('./Forecast.js');
const axios = require('axios')
const Movie = require('./Movie.js')

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('server up'));

app.get('/weather', async (req, res) => {
  //47.6062° N, 122.3321° W
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;
  const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I`

  try {
    const result = await axios.get(url)
    console.log(result.data);
    let data = result.data.data.map(weather => {
      console.log(weather);
      let weatherObj = new Forecast(weather.datetime, weather.weather.description);
      return weatherObj;
    })
    res.status(200).send(data);
  } catch(err) {
    console.error('error info: ', err)
  }
})

app.get('/movies', async (req,res) => {
  const searchQuery = req.query.searchQuery;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`

  try{
    const result = await axios.get(url)
    console.log(result.data)
    let data = result.data.results.map(movie => {
      let movieObj = new Movie(movie.title, movie.overview)
      return movieObj
    })
    res.status(200).send(data)
  } catch(err) {
    console.log('error info: ', err)
  }
})