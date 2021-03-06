import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import reducer from "./reducer/reducer.js";
import {createAPI} from "./api.js";
import thunk from "redux-thunk";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducer/user/user.js";
import history from "./history.js";
import {AppRoute} from "../src/constants.js";

const onUnauthorized = (response) => {
  const {config} = response;

  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
  if (config.method !== `get` && config.url !== `/login`) {
    history.push(AppRoute.LOGIN);
  }
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(DataOperation.loadMovies());
store.dispatch(DataOperation.loadMainMovie());
store.dispatch(UserOperation.checkAuthorization());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
