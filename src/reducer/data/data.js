import {extend} from "../../components/utils/utils.js";
import {adaptMovies, adaptMovie} from "../../adapter/movies.js";
import {} from "../app-state/app-state.js";

const initialState = {
  allMovies: [],
  mainCard: {},
  comments: [],
  favoriteMovies: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_MAIN_MOVIE: `LOAD_MAIN_MOVIE`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_FAVORITE_MOVIES: `LOAD_FAVORITE_MOVIES`,
  UPDATE_MOVIE: `UPDATE_MOVIE`,
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  }),
  loadMainMovie: (movie) => ({
    type: ActionType.LOAD_MAIN_MOVIE,
    payload: movie,
  }),
  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  }),
  loadFavoriteMovies: (movies) => ({
    type: ActionType.LOAD_FAVORITE_MOVIES,
    payload: movies
  }),
  updateMovie: (movie) => ({
    type: ActionType.UPDATE_MOVIE,
    payload: movie
  }),
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(adaptMovies(response.data)));
      });
  },
  loadMainMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadMainMovie(adaptMovie(response.data)));
      });
  },
  loadComments: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => {
        dispatch(ActionCreator.loadComments(response.data));
      });
  },
  loadFavoriteMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteMovies(adaptMovies(response.data)));
      });
  },
  changeFlagIsFavorite: (movieId, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${movieId}/${status}`)
      .then((response) => {
        dispatch(ActionCreator.loadMainMovie(adaptMovie(response.data)));
        dispatch(ActionCreator.updateMovie(adaptMovie(response.data)));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        allMovies: action.payload,
      });
    case ActionType.LOAD_MAIN_MOVIE:
      return extend(state, {
        mainCard: action.payload,
      });
    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });
    case ActionType.LOAD_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: action.payload
      });
    case ActionType.UPDATE_MOVIE:
      const changedMovie = action.payload;
      const movies = state.allMovies;
      const allMovies = movies.map((movie) => {
        if (movie.id === changedMovie.id) {
          movie = Object.assign({}, movie, {isFavorite: !movie.isFavorite});
        }
        return movie;
      });
      return extend(state, {
        allMovies
      });
    default:
      return state;
  }
};
export {ActionCreator, ActionType, reducer, Operation};
