import React from "react";
import PropTypes from "prop-types";
import MoviePageOverview from "../movie-page-overview/movie-page-overview.jsx";
import MoviePageDetails from "../movie-page-details/movie-page-details.jsx";
import MoviePageReviews from "../movie-page-reviews/movie-page-reviews.jsx";
import {MoviePages} from "../utils/constants.js";

class Tabs extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePage: MoviePages.OVERVIEW,
    };
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(tabName) {
    this.setState({activePage: tabName});
  }

  renderSelectedTab() {
    const {movie} = this.props;

    switch (this.state.activePage) {
      case MoviePages.DETAILS:
        return (
          <MoviePageDetails
            movie={movie}
          />);
      case MoviePages.REVIEWS:
        return (
          <MoviePageReviews
            movie={movie}
          />);
      default:
        return (
          <MoviePageOverview
            movie={movie}
          />);
    }
  }

  render() {
    const {activePage} = this.state;

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {Object.values(MoviePages).map((tabName, i) => (
              <li
                key={tabName + i}
                className={`movie-nav__item ${activePage === tabName && `movie-nav__item--active`}`}
                onClick={() => this.handleTabClick(tabName)}
              >
                <a href="#" className="movie-nav__link">{tabName}</a>
              </li>
            ))}
          </ul>
        </nav>

        {this.renderSelectedTab()}

      </div>
    );
  }
}

Tabs.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    backgroundImg: PropTypes.string.isRequired,
    posterImg: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    runTime: PropTypes.number.isRequired,
  }).isRequired
};

export default Tabs;
