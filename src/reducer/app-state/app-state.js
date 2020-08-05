import {extend} from "../../utils.js";
import {Genres, SHOWING_MOVIES_COUNT_ON_START, SHOWING_MOVIES_COUNT_BY_BUTTON} from "../../constants.js";
import history from "../../history.js";

const initialState = {
  genre: Genres.ALL,
  showingMoviesCount: SHOWING_MOVIES_COUNT_ON_START,
  sendingCommentData: false,
  postingError: false,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_MOVIES_COUNT: `RESET_MOVIES_COUNT`,
  CHANGE_FLAG_SENDING: `CHANGE_FLAG_SENDING`,
  CHANGE_FLAG_POSTING_ERROR: `CHANGE_FLAG_POSTING_ERROR`
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
  changeFlagPosting: (payload) => ({
    type: ActionType.CHANGE_FLAG_SENDING,
    payload,
  }),
  changeFlagPostingError: (payload) => ({
    type: ActionType.CHANGE_FLAG_POSTING_ERROR,
    payload,
  }),
};

const Operation = {
  postComment: (movieId, data) => (dispatch, getState, api) => {
    dispatch(ActionCreator.changeFlagPosting(true));
    return api.post(`/comments/${movieId}`, {
      rating: data.rating,
      comment: data.comment,
    })
     .then(() => {
       dispatch(ActionCreator.changeFlagPosting(false));
       dispatch(ActionCreator.changeFlagPostingError(false));
       history.goBack();
     })
     .catch(() => {
       dispatch(ActionCreator.changeFlagPosting(false));
       dispatch(ActionCreator.changeFlagPostingError(true));
     });
  }
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
    case ActionType.CHANGE_FLAG_SENDING:
      return extend(state, {
        sendingCommentData: action.payload,
      });
    case ActionType.CHANGE_FLAG_POSTING_ERROR:
      return extend(state, {
        postingError: action.payload,
      });
    default:
      return state;
  }
};
export {ActionCreator, ActionType, reducer, Operation};
