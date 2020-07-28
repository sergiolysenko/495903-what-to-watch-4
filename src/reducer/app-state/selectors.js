import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {findMovieById, getSimilarMoviesByGenre} from "../../components/utils/utils.js";
import {SIMILAR_MOVIES_COUNT} from "../../components/utils/constants.js";
import {getMovies} from "../data/selectors.js";

export const getChosenMovieId = (state) => {
  return state[NameSpace.APP_STATE].chosenMovieId;
};

export const getGenre = (state) => {
  return state[NameSpace.APP_STATE].genre;
};

const getPlayingMovieId = (state) => {
  return state[NameSpace.APP_STATE].playingMovie;
};

export const getPlayingMovie = createSelector(
    getPlayingMovieId,
    getMovies,
    (playingMovieId, movies) => {
      return findMovieById(movies, playingMovieId);
    }
);

export const getShowingMoviesCount = (state) => {
  return state[NameSpace.APP_STATE].showingMoviesCount;
};

export const getWritingCommentFlag = (state) => {
  return state[NameSpace.APP_STATE].writingComment;
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
        return null;
      }
      return findMovieById(movies, chosenMovieId);
    }
);

export const getSilimalMoviesToChosen = createSelector(
    (state, movies) => movies,
    (state, movies) => getChosenMovie(state, movies),
    (movies, chosenMovie) => {
      if (!chosenMovie) {
        return null;
      }
      return getSimilarMoviesByGenre(movies, chosenMovie.genre, chosenMovie.id).slice(0, SIMILAR_MOVIES_COUNT);
    }
);
