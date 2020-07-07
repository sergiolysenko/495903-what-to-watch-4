import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

export default class MoviesList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null,
    };
    this.handleCardHover = this.handleCardHover.bind(this);
  }

  render() {
    const {movies, onClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie, i) => <SmallMovieCard
          key={movie.title + i}
          movie={movie}
          onClick={onClick}
          onHover={this.handleCardHover}
        />)}
      </div>
    );
  }

  handleCardHover(activeMovie) {
    this.setState({
      activeCard: activeMovie,
    });
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
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
    preview: PropTypes.string.isRequired,
  })).isRequired,
  onClick: PropTypes.func.isRequired
};
