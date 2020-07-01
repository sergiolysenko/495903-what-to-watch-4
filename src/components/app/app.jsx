import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const onMovieTitleClick = () => {};

const App = (props) => {
  const {mainCardTitle, mainCardGenre, mainCardYear, movies} = props;

  return (
    <Main
      mainCardTitle={mainCardTitle}
      mainCardGenre={mainCardGenre}
      mainCardYear={mainCardYear}
      movies={movies}
      onMovieTitleClick={onMovieTitleClick}
    />
  );
};

App.propTypes = {
  mainCardTitle: PropTypes.string.isRequired,
  mainCardGenre: PropTypes.string.isRequired,
  mainCardYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
};

export default App;
