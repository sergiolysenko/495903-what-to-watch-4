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
    const {movies, onTitleClick} = this.props;
    return (
      <div className="catalog__movies-list">
        {movies.map((movie, i) => <SmallMovieCard
          key={movie.title + i}
          movie={movie}
          onTitleClick={onTitleClick}
          onHover={this.handleCardHover}
        />)}
      </div>
    );
  }

  handleCardHover(activeMovie) {
    this.setState({
      activeCard: activeMovie
    });
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  })).isRequired,
  onTitleClick: PropTypes.func.isRequired
};