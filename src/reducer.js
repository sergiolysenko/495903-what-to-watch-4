import {extend} from "../src/components/utils/utils.js";
import {Genres, SHOWING_MOVIES_COUNT_ON_START, SHOWING_MOVIES_COUNT_BY_BUTTON} from "../src/components/utils/constants.js";
import {allMovies} from "../src/mocks/movies.js";

const initialState = {
  chosenMovieId: -1,
  genre: Genres.ALL,
  allMovies,
  showingMoviesCount: SHOWING_MOVIES_COUNT_ON_START,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_MOVIE_ID: `CHANGE_MOVIE_ID`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_MOVIES_COUNT: `RESET_MOVIES_COUNT`,
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  changeMovie: (chosenMovieId) => ({
    type: ActionType.CHANGE_MOVIE_ID,
    payload: chosenMovieId,
  }),
  increaseShowingMovies: () => ({
    type: ActionType.SHOW_MORE_MOVIES,
    payload: SHOWING_MOVIES_COUNT_BY_BUTTON,
  }),
  resetMoviesCount: () => ({
    type: ActionType.RESET_MOVIES_COUNT,
    payload: SHOWING_MOVIES_COUNT_ON_START,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload,
      });
    case ActionType.CHANGE_MOVIE_ID:
      return extend(state, {
        id: action.payload,
      });
    case ActionType.SHOW_MORE_MOVIES:
      return extend(state, {
        showingMoviesCount: state.showingMoviesCount + action.payload,
      });
    case ActionType.RESET_MOVIES_COUNT:
      return extend(state, {
        showingMoviesCount: action.payload,
      });
    default:
      return state;
  }
};
export {ActionCreator, ActionType, reducer};
