import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import {reviews} from "./mocks/reviews.js";
import {reducer} from "./reducer.js";

const MainMovieData = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App
        mainCardTitle={MainMovieData.TITLE}
        mainCardGenre={MainMovieData.GENRE}
        mainCardYear={MainMovieData.YEAR}
        reviews={reviews}
      />
    </Provider>,
    document.querySelector(`#root`)
);
