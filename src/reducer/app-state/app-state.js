import {extend} from "../../components/utils/utils.js";
import {Genres, SHOWING_MOVIES_COUNT_ON_START, SHOWING_MOVIES_COUNT_BY_BUTTON} from "../../components/utils/constants.js";
import {Operation as DataOperation} from "../data/data.js";

const initialState = {
  chosenMovieId: -1,
  genre: Genres.ALL,
  showingMoviesCount: SHOWING_MOVIES_COUNT_ON_START,
  playingMovie: null,
  writingComment: false,
  sendingCommentData: false,
  postingError: false,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_MOVIE_ID: `CHANGE_MOVIE_ID`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_MOVIES_COUNT: `RESET_MOVIES_COUNT`,
  OPEN_PLAYER: `OPEN_PLAYER`,
  WRITE_COMMENT: `WRITE_COMMENT`,
  CHANGE_FLAG_SENDING: `CHANGE_FLAG_SENDING`,
  CHANGE_FLAG_POSTING_ERROR: `CHANGE_FLAG_POSTING_ERROR`
};

const ActionCreator = {
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
  }),
  writeComment: (payload) => ({
    type: ActionType.WRITE_COMMENT,
    payload,
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
       dispatch(DataOperation.loadComments(movieId));
       dispatch(ActionCreator.writeComment(false));
       dispatch(ActionCreator.changeFlagPosting(false));
       dispatch(ActionCreator.changeFlagPostingError(false));
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
    case ActionType.WRITE_COMMENT:
      return extend(state, {
        writingComment: action.payload,
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
