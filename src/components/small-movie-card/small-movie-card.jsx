import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {movie, onTitleClick, onHover} = props;
  const {title, src} = movie;
  return (
    <article
      onMouseEnter={() => onHover(movie)}
      className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={src}
          alt="title" width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a
          onClick={onTitleClick}
          className="small-movie-card__link"
          href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  }).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired
};

export default SmallMovieCard;
