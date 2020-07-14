import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import {movieShape} from "../utils/constants.js";

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
  movies: PropTypes.arrayOf(movieShape).isRequired,
  onClick: PropTypes.func.isRequired
};
