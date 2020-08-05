import {reducer, ActionCreator, ActionType, Operation} from "./app-state.js";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";

const Genres = {
  ALL: `All genres`,
  COMEDIES: `Comedies`,
  CRIME: `Crime`,
  DOCUMENTARY: `Documentary`,
  DRAMA: `Drama`,
  HORROR: `Horror`,
  KIDS_FAMILY: `Kids & Family`,
  ROMANCE: `Romance`,
  SCI_FI: `Sci-Fi`,
  THRILLERS: `Thrillers`,
};

const SHOWING_MOVIES_COUNT_ON_START = 8;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 8;

describe(`app-state reducer test`, () => {
  it(`Check if initial state is correct`, () => {
    expect(reducer(undefined, {})).toEqual({
      genre: Genres.ALL,
      showingMoviesCount: SHOWING_MOVIES_COUNT_ON_START,
      sendingCommentData: false,
      postingError: false,
    });
  });

  it(`Change genre`, () => {
    expect(reducer({
      genre: Genres.ALL,
    }, {
      type: ActionType.CHANGE_GENRE,
      payload: Genres.DRAMA,
    })).toEqual({
      genre: Genres.DRAMA,
    });
  });

  it(`Show more movies`, () => {
    expect(reducer({
      showingMoviesCount: SHOWING_MOVIES_COUNT_ON_START,
    }, {
      type: ActionType.SHOW_MORE_MOVIES,
      payload: SHOWING_MOVIES_COUNT_BY_BUTTON,
    })).toEqual({
      showingMoviesCount: 16,
    });
  });

  it(`Reset movies count`, () => {
    expect(reducer({
      showingMoviesCount: 16,
    }, {
      type: ActionType.RESET_MOVIES_COUNT,
      payload: SHOWING_MOVIES_COUNT_ON_START
    })).toEqual({
      showingMoviesCount: SHOWING_MOVIES_COUNT_ON_START
    });
  });
  it(`reset showing movies count`, () => {
    expect(reducer({
      sendingCommentData: true,
    },
    {
      type: ActionType.CHANGE_FLAG_SENDING,
      payload: false,
    })).toEqual({
      sendingCommentData: false,
    });
  });
});

describe(`App-state action creator works correctly`, () => {
  it(`Action creator change genre`, () => {
    expect(ActionCreator.changeGenre(Genres.DOCUMENTARY)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: Genres.DOCUMENTARY,
    });
  });

  it(`Action creator increase showing movies`, () => {
    expect(ActionCreator.increaseShowingMovies()).toEqual({
      type: ActionType.SHOW_MORE_MOVIES,
      payload: SHOWING_MOVIES_COUNT_BY_BUTTON,
    });
  });

  it(`Action creator reset movies count`, () => {
    expect(ActionCreator.resetMoviesCount()).toEqual({
      type: ActionType.RESET_MOVIES_COUNT,
      payload: SHOWING_MOVIES_COUNT_ON_START,
    });
  });

  it(`Action creator change flag posting`, () => {
    expect(ActionCreator.changeFlagPosting(true)).toEqual({
      type: ActionType.CHANGE_FLAG_SENDING,
      payload: true,
    });
  });

  it(`Action creator change flag posting error`, () => {
    expect(ActionCreator.changeFlagPostingError(true)).toEqual({
      type: ActionType.CHANGE_FLAG_POSTING_ERROR,
      payload: true,
    });
  });
});

describe(`App-state operation works correctly`, () => {

  const onServerError = () => {};
  const onUnauthorized = () => {};

  const api = createAPI(onServerError, onUnauthorized);

  it(`Operation post comment`, () => {
    const commentData = {
      rating: ``,
      comment: ``
    };

    const apiMock = new MockAdapter(api);
    apiMock.onPost(`comments/12`, {
      rating: ``,
      comment: ``
    })
      .reply(`200`, [{fake: true}]);

    const dispatch = jest.fn();
    const commentPost = Operation.postComment(12, commentData);

    return commentPost(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
      });
  });
});
