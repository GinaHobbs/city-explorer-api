'use strict';
const axios = require('axios');
const Movie = require('./Movie.js');
const cache = require('./cache.js');

async function getMovies (req,res) {
  const searchQuery = req.query.searchQuery;
  const key = 'movies-' + searchQuery
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;

  try{
    if (!cache[key]) {
      cache[key] = {};
      cache[key].timestamp = Date.now();
      const result = await axios.get(url);
      cache[key].data = result.data.results.map(movie => {
        let movieObj = new Movie(movie.title, movie.overview);
        return movieObj;
      })
      res.status(200).send(cache[key].data)
    }
  } catch(err) {
    console.log('error info: ', err);
  }
}

module.exports = getMovies;