import {extend} from "../src/components/utils/utils.js";
import {Genres, SHOWING_MOVIES_COUNT_ON_START, SHOWING_MOVIES_COUNT_BY_BUTTON} from "../src/components/utils/constants.js";
import {allMovies} from "../src/mocks/movies.js";

const initialState = {
  genre: Genres.ALL,
  allMovies,
  showingMoviesCount: SHOWING_MOVIES_COUNT_ON_START,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_MOVIES_COUNT: `RESET_MOVIES_COUNT`,
};

const getFilteredMovies = (genre) => {
  const filteredMovies = initialState.allMovies;

  if (genre === Genres.ALL) {
    return filteredMovies;
  }

  if (!filteredMovies) {
    return [];
  }

  return filteredMovies.filter((movie) => movie.genre === genre);
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
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
export {ActionCreator, ActionType, reducer, getFilteredMovies};
