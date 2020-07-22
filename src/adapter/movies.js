const adaptMovie = (movie) => ({
  id: movie.id,
  title: movie.name,
  posterImg: movie.poster_image,
  cardImg: movie.preview_image,
  backgroundImg: movie.background_image,
  backgroundColor: movie.background_color,
  videoLink: movie.video_link,
  preview: movie.preview_video_link,
  description: movie.description,
  rating: movie.rating,
  ratingCount: movie.scores_count,
  director: movie.director,
  starring: movie.starring,
  runTime: movie.run_time,
  genre: movie.genre,
  year: movie.released,
  isFavorite: movie.is_favorite,
});

const adaptMovies = (movies) => movies.map((movie) => adaptMovie(movie));

export {adaptMovies};
