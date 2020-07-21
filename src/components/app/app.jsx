import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MoviePage from "../movie-page/movie-page.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import {findMovieById, getFilteredMovies} from "../utils/utils.js";
import {movieShape, Genres, SIMILAR_MOVIES_COUNT} from "../utils/constants.js";
import {getSimilarMoviesByGenre} from "../utils/utils.js";

const App = (props) => {
  const {mainCardTitle, mainCardGenre, mainCardYear, filteredMovies, reviews, isButtonShowMoreDisplayed, onShowMoreClick, chosenMovieId, onCardClick, chosenMovie, similarMoviesToChosen} = props;

  const renderApp = () => {
    if (chosenMovieId === -1) {
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
        similarMovies={similarMoviesToChosen}
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
            similarMovies={similarMoviesToChosen}
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
  const {genre, chosenMovieId, allMovies, showingMoviesCount} = state;

  let movies = allMovies;
  let chosenMovie = {};
  let similarMoviesToChosen = [];

  if (genre !== Genres.ALL) {
    movies = getFilteredMovies(genre, allMovies);
  }

  const isButtonShowMoreDisplayed = movies.length >= showingMoviesCount;
  const displayedNumberOfFilms = movies.slice(0, showingMoviesCount);

  if (chosenMovieId !== -1) {
    chosenMovie = findMovieById(displayedNumberOfFilms, chosenMovieId);
    similarMoviesToChosen = getSimilarMoviesByGenre(movies, chosenMovie.genre, chosenMovieId).slice(0, SIMILAR_MOVIES_COUNT);
  }

  return {
    filteredMovies: displayedNumberOfFilms,
    isButtonShowMoreDisplayed,
    chosenMovieId,
    chosenMovie,
    similarMoviesToChosen,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onShowMoreClick() {
    dispatch(ActionCreator.increaseShowingMovies());
  },
  onCardClick(chosenMovieId) {
    dispatch(ActionCreator.changeMovie(chosenMovieId));
  }
});

App.propTypes = {
  mainCardTitle: PropTypes.string.isRequired,
  mainCardGenre: PropTypes.string.isRequired,
  mainCardYear: PropTypes.number.isRequired,
  filteredMovies: PropTypes.arrayOf(movieShape).isRequired,
  isButtonShowMoreDisplayed: PropTypes.bool.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  chosenMovieId: PropTypes.number.isRequired,
  chosenMovie: PropTypes.object,
  similarMoviesToChosen: PropTypes.array,
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
