import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {getSimilarMoviesByGenre} from "../../components/utils/utils.js";
import {SIMILAR_MOVIES_COUNT} from "../../components/utils/constants.js";
import {getMovies} from "../data/selectors.js";

export const getGenre = (state) => {
  return state[NameSpace.APP_STATE].genre;
};

export const getShowingMoviesCount = (state) => {
  return state[NameSpace.APP_STATE].showingMoviesCount;
};

export const getSendingCommentDataFlag = (state) => {
  return state[NameSpace.APP_STATE].sendingCommentData;
};

export const getPostingError = (state) => {
  return state[NameSpace.APP_STATE].postingError;
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

export const getSilimalMoviesToChosen = createSelector(
    getMovies,
    (state, chosenMovie) =>chosenMovie,
    (movies, chosenMovie) => {
      if (!chosenMovie) {
        return null;
      }
      return getSimilarMoviesByGenre(movies, chosenMovie.genre, chosenMovie.id).slice(0, SIMILAR_MOVIES_COUNT);
    }
);
