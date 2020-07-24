import {extend} from "../../components/utils/utils.js";
import {adaptMovies, adaptMovie} from "../../adapter/movies.js";

const initialState = {
  allMovies: [],
  mainCard: {},
};

const ActionType = {
  SET_MOVIES: `SET_MOVIES`,
  SET_MAIN_MOVIE: `SET_MAIN_MOVIE`,
};

const ActionCreator = {
  setMovies: (movies) => ({
    type: ActionType.SET_MOVIES,
    payload: movies,
  }),
  setMainMovie: (movie) => ({
    type: ActionType.SET_MAIN_MOVIE,
    payload: movie,
  }),
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.setMovies(adaptMovies(response.data)));
      });
  },
  loadMainMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.setMainMovie(adaptMovie(response.data)));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_MOVIES:
      return extend(state, {
        allMovies: action.payload,
      });
    case ActionType.SET_MAIN_MOVIE:
      return extend(state, {
        mainCard: action.payload,
      });
    default:
      return state;
  }
};
export {ActionCreator, ActionType, reducer, Operation};
