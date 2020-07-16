import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import {movieShape} from "../utils/constants.js";
import withSmallCardHover from "../../hocs/with-small-card-hover/with-small-card-hover.js";

const SmallCardWrapped = withSmallCardHover(SmallMovieCard);

const MoviesList = (props) => {
  const {movies, onClick, handleActive} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((movie, i) => <SmallCardWrapped
        key={movie.title + i}
        movie={movie}
        onClick={onClick}
        onHover={handleActive}
      />)}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(movieShape).isRequired,
  onClick: PropTypes.func.isRequired,
  handleActive: PropTypes.func.isRequired,
};

export default MoviesList;
