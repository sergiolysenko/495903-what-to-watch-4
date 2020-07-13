const getRatingLevel = (raiting) => {
  const validRaiting = Number(raiting.replace(`,`, `.`));
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

const getMovieReviews = (movieId, reviews) => {
  if (!reviews) {
    return [];
  }
  return reviews.filter((review) => review.id === movieId);
};

const findMovieById = (movies, id) => {
  if (!movies) {
    return [];
  }
  return movies.find((movie) => movie.id === id);
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
  genreList.add(`All genres`);
  movies.forEach((movie) => genreList.add(movie.genre));
  return genreList;
};


export {getRatingLevel, findMovieById, getMovieReviews, getSimilarMoviesByGenre, extend, getGenreList};
