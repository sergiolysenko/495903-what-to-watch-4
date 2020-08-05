import React from "react";
import PropTypes from "prop-types";
import MoviePageOverview from "../movie-page-overview/movie-page-overview.jsx";
import MoviePageDetails from "../movie-page-details/movie-page-details.jsx";
import MoviePageReviews from "../movie-page-reviews/movie-page-reviews.jsx";
import {MoviePages, commentsShape, movieShape} from "../../constants.js";

const Tabs = (props) => {
  const {movie, movieId, activeItem, handleActive} = props;

  if (!movie) {
    return null;
  }

  const renderSelectedTab = () => {
    switch (activeItem) {
      case MoviePages.DETAILS:
        return (
          <MoviePageDetails
            movie={movie}
          />);
      case MoviePages.REVIEWS:
        return (
          <MoviePageReviews
            movieId={movieId}
          />);
      default:
        return (
          <MoviePageOverview
            movie={movie}
          />);
    }
  };

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {Object.values(MoviePages).map((tabName, i) => (
            <li
              key={tabName + i}
              className={`movie-nav__item ${activeItem === tabName && `movie-nav__item--active`}`}
            >
              <a
                onClick={(evt) => {
                  evt.preventDefault();
                  handleActive(tabName);
                }}
                href="#" className="movie-nav__link">{tabName}</a>
            </li>
          ))}
        </ul>
      </nav>

      {renderSelectedTab()}

    </div>
  );
};

Tabs.defaultProps = {
  activeItem: MoviePages.OVERVIEW,
};

Tabs.propTypes = {
  movie: movieShape.isRequired,
  movieId: PropTypes.number,
  comments: commentsShape,
  handleActive: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
};

export default Tabs;
