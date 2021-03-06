import {extend} from "../../utils.js";
import {adaptMovies, adaptMovie} from "../../adapter/movies.js";
import {FavoriteStatus} from "../../constants.js";
import {updateMoviesOnChange} from "../../utils.js";

const initialState = {
  allMovies: [],
  mainCard: {},
  comments: [],
  favoriteMovies: [],
};

const ActionType = {
  SET_MOVIES: `SET_MOVIES`,
  SET_MAIN_MOVIE: `SET_MAIN_MOVIE`,
  SET_COMMENTS: `SET_COMMENTS`,
  SET_FAVORITE_MOVIES: `SET_FAVORITE_MOVIES`,
  UPDATE_MOVIES: `UPDATE_MOVIES`,
  UPDATE_MAIN_CARD: `UPDATE_MAIN_CARD`,
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
  setComments: (comments) => ({
    type: ActionType.SET_COMMENTS,
    payload: comments,
  }),
  setFavoriteMovies: (movies) => ({
    type: ActionType.SET_FAVORITE_MOVIES,
    payload: movies
  }),
  updateMovies: (movie) => ({
    type: ActionType.UPDATE_MOVIES,
    payload: movie
  }),
  updateMainCard: (movie) => ({
    type: ActionType.UPDATE_MAIN_CARD,
    payload: movie
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
  loadComments: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => {
        dispatch(ActionCreator.setComments(response.data));
      });
  },
  loadFavoriteMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.setFavoriteMovies(adaptMovies(response.data)));
      });
  },
  changeFlagIsFavorite: (movieId, isFavorite, isMainCardUpdate) => (dispatch, getState, api) => {
    const status = isFavorite ? FavoriteStatus.REMOVE : FavoriteStatus.ADD;
    return api.post(`/favorite/${movieId}/${status}`)
      .then((response) => {
        dispatch(ActionCreator.updateMovies(adaptMovie(response.data)));
        if (isMainCardUpdate) {
          dispatch(ActionCreator.updateMainCard(adaptMovie(response.data)));
        }
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
    case ActionType.SET_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });
    case ActionType.SET_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: action.payload
      });
    case ActionType.UPDATE_MOVIES:
      return extend(state, {
        allMovies: updateMoviesOnChange(state.allMovies, action.payload),
      });
    case ActionType.UPDATE_MAIN_CARD:
      return extend(state, {
        mainCard: action.payload,
      });
    default:
      return state;
  }
};
export {ActionCreator, ActionType, reducer, Operation};
