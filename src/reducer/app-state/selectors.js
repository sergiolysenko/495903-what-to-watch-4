import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {findMovieById, getSimilarMoviesByGenre} from "../../components/utils/utils.js";
import {SIMILAR_MOVIES_COUNT} from "../../components/utils/constants.js";

export const getChosenMovieId = (state) => {
  return state[NameSpace.APP_STATE].chosenMovieId;
};

export const getGenre = (state) => {
  return state[NameSpace.APP_STATE].genre;
};

export const getPlayingMovie = (state) => {
  return state[NameSpace.APP_STATE].playingMovie;
};

export const getShowingMoviesCount = (state) => {
  return state[NameSpace.APP_STATE].showingMoviesCount;
};

export const displayShowMoreButton = createSelector(
    getShowingMoviesCount,
    (state, movies) => movies,
    (moviesCount, movies) => {
      return movies.length >= moviesCount;
    }
);

export const getListOfDisplayedMovies = createSelector(
    getShowingMoviesCount,
    (state, movies) => movies,
    (moviesCount, movies) => {
      return movies.slice(0, moviesCount);
    }
);

export const getChosenMovie = createSelector(
    getChosenMovieId,
    (state, movies) => movies,
    (chosenMovieId, movies) => {
      if (chosenMovieId === -1) {
        return {};
      }
      return findMovieById(movies, chosenMovieId);
    }
);

export const getSilimalMoviesToChosen = createSelector(
    (state, movies) => movies,
    (state, movies) => getChosenMovie(state, movies),
    getChosenMovieId,
    (movies, chosenMovie, chosenMovieId) => {
      if (chosenMovieId === -1) {
        return [];
      }
      return getSimilarMoviesByGenre(movies, chosenMovie.genre, chosenMovieId).slice(0, SIMILAR_MOVIES_COUNT);
    }
);