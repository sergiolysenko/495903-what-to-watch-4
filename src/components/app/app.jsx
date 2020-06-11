import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const App = (props) => {
  const {mainCardTitle, mainCardGenre, mainCardYear, movieTitles} = props;

  return (
    <Main
      mainCardTitle={mainCardTitle}
      mainCardGenre={mainCardGenre}
      mainCardYear={mainCardYear}
      movieTitles={movieTitles}
    />
  );
};

App.propTypes = {
  mainCardTitle: PropTypes.string.isRequired,
  mainCardGenre: PropTypes.string.isRequired,
  mainCardYear: PropTypes.number.isRequired,
  movieTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
