import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MoviePage from "../movie-page/movie-page.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import {findMovieById, getFilteredMovies} from "../utils/utils.js";
import {movieShape, Genres} from "../utils/constants.js";

const App = (props) => {
  const {mainCardTitle, mainCardGenre, mainCardYear, filteredMovies, reviews, isButtonShowMoreDisplayed, onShowMoreClick, id, onCardClick, chosenMovie} = props;

  const renderApp = () => {
    if (id === -1) {
      return (
        <Main
          mainCardTitle={mainCardTitle}
          mainCardGenre={mainCardGenre}
          mainCardYear={mainCardYear}
          movies={filteredMovies}
          onMovieClick={onCardClick}
          isButtonShowMoreDisplayed={isButtonShowMoreDisplayed}
          onShowMoreClick={onShowMoreClick}
        />);
    }

    return (
      <MoviePage
        movie={chosenMovie}
        movies={filteredMovies}
        reviews={reviews}
        onMovieClick={onCardClick}
      />);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {renderApp()}
        </Route>
        <Route exact path="/movie-page">
          <MoviePage
            movie={filteredMovies[0]}
            movies={filteredMovies}
            onMovieClick={onCardClick}
            reviews={reviews}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  const {genre, id, allMovies, showingMoviesCount} = state;

  let movies = allMovies;
  if (genre !== Genres.ALL) {
    movies = getFilteredMovies(genre, allMovies);
  }
  const isButtonShowMoreDisplayed = movies.length >= showingMoviesCount;

  const displayedNumberOfFilms = movies.slice(0, showingMoviesCount);

  const chosenMovie = findMovieById(displayedNumberOfFilms, id);

  return {
    filteredMovies: displayedNumberOfFilms,
    isButtonShowMoreDisplayed,
    id,
    chosenMovie,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onShowMoreClick() {
    dispatch(ActionCreator.increaseShowingMovies());
  },
  onCardClick(id) {
    dispatch(ActionCreator.changeMovie(id));
  }
});

App.propTypes = {
  mainCardTitle: PropTypes.string.isRequired,
  mainCardGenre: PropTypes.string.isRequired,
  mainCardYear: PropTypes.number.isRequired,
  filteredMovies: PropTypes.arrayOf(movieShape).isRequired,
  isButtonShowMoreDisplayed: PropTypes.bool.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  chosenMovie: PropTypes.object,
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
  onCardClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
