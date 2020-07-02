import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {movie, onClick, onHover} = props;
  const {title, cardImg} = movie;
  return (
    <article
      onMouseEnter={() => onHover(movie)}
      onClick={(evt) => {
        evt.preventDefault();
        onClick(movie);
      }}
      className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={cardImg}
          alt="title" width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a
          onClick={(evt) => {
            evt.preventDefault();
            onClick(movie);
          }}
          className="small-movie-card__link"
          href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cardImg: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired
};

export default SmallMovieCard;
