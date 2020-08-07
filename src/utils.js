import {Genres} from "./constants.js";

const getRatingLevel = (validRaiting) => {
  if (validRaiting >= 8 && validRaiting < 10) {
    return `Very good`;
  }
  if (validRaiting >= 5 && validRaiting < 8) {
    return `Good`;
  }
  if (validRaiting >= 3 && validRaiting < 5) {
    return `Normal`;
  }
  if (validRaiting < 3) {
    return `Bad`;
  }
  return `Awesome`;
};

const removeCurrentMovieFromSimilar = (arr, id) => {
  if (!arr) {
    return [];
  }
  const indexOfCurrentMovie = arr.findIndex((movie) => movie.id === id);
  if (indexOfCurrentMovie > -1) {
    arr.splice(indexOfCurrentMovie, 1);
  }
  return arr;
};

const getSimilarMoviesByGenre = (movies, genre, id) => {
  if (!movies) {
    return [];
  }
  const AllSimilarMovies = movies.filter((movie) => movie.genre === genre);
  return removeCurrentMovieFromSimilar(AllSimilarMovies, id);
};

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const getGenreList = (movies) => {
  const genreList = new Set();
  genreList.add(Genres.ALL);
  movies.forEach((movie) => genreList.add(movie.genre));
  return genreList;
};

const getFilteredMovies = (genre, movies) => {
  if (genre === Genres.ALL) {
    return movies;
  }

  if (!movies) {
    return [];
  }

  return movies.filter((movie) => movie.genre === genre);
};

const secondsToTime = (seconds) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeString = date.toISOString().substring(11, 19);
  return timeString;
};

const updateMoviesOnChange = (movies, changedMovie) => {
  return movies.map((movie) => {
    if (movie.id === changedMovie.id) {
      movie = changedMovie;
    }
    return movie;
  });
};

export {getRatingLevel, getSimilarMoviesByGenre, extend, getGenreList, getFilteredMovies, secondsToTime, updateMoviesOnChange};
