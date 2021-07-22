'use strict';
const axios = require('axios');
const Movie = require('./Movie.js');

async function getMovies (req,res) {
  const searchQuery = req.query.searchQuery;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;

  try{
    const result = await axios.get(url);
    // console.log(result.data);
    let data = result.data.results.map(movie => {
      let movieObj = new Movie(movie.title, movie.overview);
      return movieObj;
    })
    res.status(200).send(data)
  } catch(err) {
    console.log('error info: ', err);
  }
}

module.exports = getMovies;