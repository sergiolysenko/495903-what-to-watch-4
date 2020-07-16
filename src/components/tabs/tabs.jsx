import React from "react";
import PropTypes from "prop-types";
import MoviePageOverview from "../movie-page-overview/movie-page-overview.jsx";
import MoviePageDetails from "../movie-page-details/movie-page-details.jsx";
import MoviePageReviews from "../movie-page-reviews/movie-page-reviews.jsx";
import {MoviePages} from "../utils/constants.js";
import {movieShape} from "../utils/constants.js";

const Tabs = (props) => {
  const {movie, reviews, activeItem, handleActive} = props;

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
            movie={movie}
            reviews={reviews}
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
              onClick={() => handleActive(tabName)}
            >
              <a href="#" className="movie-nav__link">{tabName}</a>
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
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
  handleActive: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
};

export default Tabs;
