import React from "react";
import PropTypes from "prop-types";
import {getRatingLevel} from "../utils/utils.js";

const MoviePageOverview = (props) => {
  const {movie} = props;
  const {rating, ratingCount, description, director, starring} = movie;
  const raitingLevel = getRatingLevel(rating);
  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{raitingLevel}</span>
          <span className="movie-rating__count">{ratingCount} ratings</span>
        </p>
      </div>
      <div className="movie-card__text">
        <p>{description}</p>
        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {starring.slice(0, 4).join(`, `)} and other</strong></p>
      </div>
    </React.Fragment>
  );
};

MoviePageOverview.propTypes = {
  movie: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired
};

export default MoviePageOverview;
