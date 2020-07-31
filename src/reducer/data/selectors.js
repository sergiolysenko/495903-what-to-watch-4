import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {Genres} from "../../components/utils/constants.js";
import {getFilteredMovies} from "../../components/utils/utils.js";

export const getMovies = (state) => {
  return state[NameSpace.DATA].allMovies;
};

export const getMainMovie = (state) => {
  return state[NameSpace.DATA].mainCard;
};

export const getComments = (state) => {
  return state[NameSpace.DATA].comments;
};

export const getMovieById = createSelector(
    getMovies,
    (state, id) => id,
    (movies, id) => {
      return movies.find((movie) => movie.id === Number(id));
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
