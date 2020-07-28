import {extend} from "../../components/utils/utils.js";
import {adaptMovies, adaptMovie} from "../../adapter/movies.js";

const initialState = {
  allMovies: [],
  mainCard: {},
  comments: [],
};

const ActionType = {
  SET_MOVIES: `SET_MOVIES`,
  SET_MAIN_MOVIE: `SET_MAIN_MOVIE`,
  SET_COMMENTS: `SET_COMMENTS`,
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
  })
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
  addComment: (movieId, data) => (dispatch, getState, api) => {
    return api.post(`/comments/${movieId}`, {
      rating: data.rating,
      comment: data.comment,
    });
    /* .then(() => {
        dispatch(ActionCreator.addComment);
      }); */
  }
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
    default:
      return state;
  }
};
export {ActionCreator, ActionType, reducer, Operation};
