import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {Genres, SIMILAR_MOVIES_COUNT} from "../../constants.js";
import {getFilteredMovies, getSimilarMoviesByGenre} from "../../utils.js";

export const getMovies = (state) => {
  return state[NameSpace.DATA].allMovies;
};

export const getMainMovie = (state) => {
  return state[NameSpace.DATA].mainCard;
};

export const getComments = (state) => {
  return state[NameSpace.DATA].comments;
};

export const getFavoriteMovies = (state) => {
  return state[NameSpace.DATA].favoriteMovies;
};

export const getMovieById = createSelector(
    getMovies,
    (state, id) => Number(id),
    (movies, id) => {
      return movies.find((movie) => movie.id === id);
    }
);

export const getSilimalMoviesToChosen = createSelector(
    getMovies,
    (state, chosenMovie) => chosenMovie,
    (movies, chosenMovie) => {
      if (!chosenMovie) {
        return null;
      }
      return getSimilarMoviesByGenre(movies, chosenMovie.genre, chosenMovie.id).slice(0, SIMILAR_MOVIES_COUNT);
    }
);

export const getFilteredMoviesByGenre = createSelector(
    getMovies,
    (state, genre) => genre,
    (movies, genre) => {
      if (genre === Genres.ALL) {
        return movies;
      }
      return getFilteredMovies(genre, movies);
    }
);
