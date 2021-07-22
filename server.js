'use strict'

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const getWeather = require('./weather.js');
const getMovies = require('./movies.js');

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('server up'));

app.get('/weather', getWeather);

app.get('/movies', getMovies);

//Taken from demo code
app.get('*', notFoundHandler);

function notFoundHandler(req, res) {
  res.status(404).send('404: route not found');
}