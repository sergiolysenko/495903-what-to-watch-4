import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import movies from "./mocks/movies.js";
import {reviews} from "./mocks/reviews.js";

const MainMovieData = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

ReactDOM.render(
    <App
      mainCardTitle={MainMovieData.TITLE}
      mainCardGenre={MainMovieData.GENRE}
      mainCardYear={MainMovieData.YEAR}
      movies={movies}
      reviews={reviews}
    />,
    document.querySelector(`#root`)
);
