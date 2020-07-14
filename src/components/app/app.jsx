import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MoviePage from "../movie-page/movie-page.jsx";
import {connect} from "react-redux";
import {findMovieById, getFilteredMovies} from "../utils/utils.js";
import {movieShape, Genres} from "../utils/constants.js";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: null,
    };

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  renderApp() {
    const {mainCardTitle, mainCardGenre, mainCardYear, filteredMovies, reviews} = this.props;

    if (this.state.selectedMovie === null) {
      return (
        <Main
          mainCardTitle={mainCardTitle}
          mainCardGenre={mainCardGenre}
          mainCardYear={mainCardYear}
          movies={filteredMovies}
          onMovieClick={this.handleCardClick}
        />);
    }
    const chosenMovie = findMovieById(filteredMovies, this.state.selectedMovie);
    return (
      <MoviePage
        movie={chosenMovie}
        movies={filteredMovies}
        reviews={reviews}
        onMovieClick={this.handleCardClick}
      />);
  }

  handleCardClick(id) {
    this.setState({
      selectedMovie: id,
    });
  }

  render() {
    const {filteredMovies, reviews} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderApp()}
          </Route>
          <Route exact path="/movie-page">
            <MoviePage
              movie={filteredMovies[0]}
              movies={filteredMovies}
              onMovieClick={this.handleCardClick}
              reviews={reviews}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  mainCardTitle: PropTypes.string.isRequired,
  mainCardGenre: PropTypes.string.isRequired,
  mainCardYear: PropTypes.number.isRequired,
  filteredMovies: PropTypes.arrayOf(movieShape).isRequired,
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
};

const mapStateToProps = (state) => {
  const {genre, allMovies, showingMoviesCount} = state;
  let movies = allMovies;
  if (genre !== Genres.ALL) {
    movies = getFilteredMovies(genre, allMovies);
  }

  const displayedNumberOfFilms = movies.slice(0, showingMoviesCount);

  return {
    filteredMovies: displayedNumberOfFilms
  };
};

export default connect(mapStateToProps)(App);
