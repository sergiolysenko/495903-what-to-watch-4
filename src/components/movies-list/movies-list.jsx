import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import {movieShape} from "../utils/constants.js";
import withPlayingCard from "../../hocs/with-playing-card/with-playing-card.js";

const SmallCardWrapped = withPlayingCard(SmallMovieCard);

const MoviesList = (props) => {
  const {movies, onClick} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((movie, i) => <SmallCardWrapped
        key={movie.title + i}
        movie={movie}
        onClick={onClick}
      />)}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(movieShape).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MoviesList;
