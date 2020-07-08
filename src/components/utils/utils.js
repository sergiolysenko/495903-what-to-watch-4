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
  return reviews.filter((review) => review.id === movieId);
};

const findMovieById = (movies, id) => {
  return movies.find((movie) => movie.id === id);
};

export {getRatingLevel, findMovieById, getMovieReviews};
