import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

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
    />,
    document.querySelector(`#root`)
);
