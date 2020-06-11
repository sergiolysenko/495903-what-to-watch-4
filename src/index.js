import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const MainMovieData = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};
const movieTitles = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Snatch`, `Moonrise Kingdom`, `Seven Years in Tibet`];

ReactDOM.render(
    <App
      mainCardTitle={MainMovieData.TITLE}
      mainCardGenre={MainMovieData.GENRE}
      mainCardYear={MainMovieData.YEAR}
      movieTitles={movieTitles}
    />,
    document.querySelector(`#root`)
);
