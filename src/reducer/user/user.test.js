import {ActionCreator, reducer, Operation, AuthorizationStatus, ActionType} from "./user.js";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";

const authData = {
  email: `assd@mail.com`,
  password: `1234`
};

describe(`user reducer test`, () => {
  it(`Check initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      isEmailValid: true,
    });
  });

  it(`change authorization status`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });
  });

  it(`change valid email flag`, () => {
    expect(reducer({
      isEmailValid: true,
    }, {
      type: ActionType.CHANGE_FLAG_EMAIL_VALID,
      payload: false
    })).toEqual({
      isEmailValid: false,
    });
  });
});

describe(`user action creator work correctly`, () => {
  it(`Action creator change authorization status`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    });
  });

  it(`Action creator change flag email valid`, () => {
    expect(ActionCreator.changeFlagEmailValid(false)).toEqual({
      type: ActionType.CHANGE_FLAG_EMAIL_VALID,
      payload: false,
    });
  });
});

describe(`user operation works correctly`, () => {
  const onServerError = () => {};
  const onUnauthorized = () => {};

  const api = createAPI(onServerError, onUnauthorized);

  it(`Operation check authorization`, () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet(`/login`).reply(`200`);
    const dispatch = jest.fn();
    const checkAuthorization = Operation.checkAuthorization();

    return checkAuthorization(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRE_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH
        });
      });
  });

  it(`Operation login`, () => {
    const apiMock = new MockAdapter(api);
    apiMock.onPost(`/login`).reply(`200`, [{fake: true}]);
    const dispatch = jest.fn();
    const login = Operation.login(authData);

    return login(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
      });
  });
});
