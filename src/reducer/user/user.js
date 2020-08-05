import {extend} from "../../utils.js";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isEmailValid: true,
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  CHANGE_FLAG_EMAIL_VALID: `CHANGE_FLAG_EMAIL_VALID`,
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: status,
  }),
  changeFlagEmailValid: (flag) => ({
    type: ActionType.CHANGE_FLAG_EMAIL_VALID,
    payload: flag,
  }),
};

const Operation = {
  checkAuthorization: () => (dispatch, getState, api) => {
    return api.get(`/login`)
    .then(() => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
    })
    .catch((err) =>{
      throw (err);
    });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
    .then(() => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.changeFlagEmailValid(true));
    })
    .catch(() => {
      dispatch(ActionCreator.changeFlagEmailValid(false));
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.CHANGE_FLAG_EMAIL_VALID:
      return extend(state, {
        isEmailValid: action.payload,
      });
    default:
      return state;
  }
};

export {reducer, Operation, ActionCreator, ActionType, AuthorizationStatus};
