import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import {reviews} from "./mocks/reviews.js";
import reducer from "./reducer/reducer.js";
import {createAPI} from "./api.js";
import thunk from "redux-thunk";
import {Operation as DataOperation} from "./reducer/data/data.js";

const api = createAPI();

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(DataOperation.loadMovies());
store.dispatch(DataOperation.loadMainMovie());

ReactDOM.render(
    <Provider store={store}>
      <App
        reviews={reviews}
      />
    </Provider>,
    document.querySelector(`#root`)
);
