import {extend} from "../src/components/utils/utils.js";
import {Genres, SHOWING_MOVIES_COUNT_ON_START, SHOWING_MOVIES_COUNT_BY_BUTTON} from "../src/components/utils/constants.js";
import {adaptMovies} from "./adapter/movies.js";
import mainCard from "../src/mocks/main-card.js";

const initialState = {
  chosenMovieId: -1,
  genre: Genres.ALL,
  allMovies: [],
  mainCard,
  showingMoviesCount: SHOWING_MOVIES_COUNT_ON_START,
  playingMovie: null,
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_MOVIE_ID: `CHANGE_MOVIE_ID`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_MOVIES_COUNT: `RESET_MOVIES_COUNT`,
  OPEN_PLAYER: `OPEN_PLAYER`,
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  }),
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  changeMovie: (id) => ({
    type: ActionType.CHANGE_MOVIE_ID,
    payload: id,
  }),
  increaseShowingMovies: () => ({
    type: ActionType.SHOW_MORE_MOVIES,
    payload: SHOWING_MOVIES_COUNT_BY_BUTTON,
  }),
  resetMoviesCount: () => ({
    type: ActionType.RESET_MOVIES_COUNT,
    payload: SHOWING_MOVIES_COUNT_ON_START,
  }),
  openPlayer: (movie) => ({
    type: ActionType.OPEN_PLAYER,
    payload: movie
  })
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        allMovies: adaptMovies(action.payload),
      });
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload,
      });
    case ActionType.CHANGE_MOVIE_ID:
      return extend(state, {
        chosenMovieId: action.payload,
      });
    case ActionType.SHOW_MORE_MOVIES:
      return extend(state, {
        showingMoviesCount: state.showingMoviesCount + action.payload,
      });
    case ActionType.RESET_MOVIES_COUNT:
      return extend(state, {
        showingMoviesCount: action.payload,
      });
    case ActionType.OPEN_PLAYER:
      return extend(state, {
        playingMovie: action.payload,
      });
    default:
      return state;
  }
};
export {ActionCreator, ActionType, reducer, Operation};
