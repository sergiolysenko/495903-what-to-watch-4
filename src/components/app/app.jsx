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
import VideoPlayer from "../video-player/video-player.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";

const VideoPlayerWrapped = withVideoPlayer(VideoPlayer);

const App = (props) => {
  const {mainCard, filteredMovies, reviews, isButtonShowMoreDisplayed, onShowMoreClick, chosenMovieId, onCardClick, onPlayClick, playingMovie, chosenMovie, similarMoviesToChosen} = props;

  const renderApp = () => {
    if (playingMovie) {
      return <VideoPlayerWrapped
        isMuted={false}
        poster={playingMovie.cardImg}
        source={playingMovie.videoLink}
        isPlaying={true}
        onPlayClick={onPlayClick}
      />;
    }
    if (chosenMovieId === -1) {
      return (
        <Main
          mainCard={mainCard}
          movies={filteredMovies}
          onMovieClick={onCardClick}
          isButtonShowMoreDisplayed={isButtonShowMoreDisplayed}
          onShowMoreClick={onShowMoreClick}
          onPlayClick={onPlayClick}
        />);
    }

    return (
      <MoviePage
        movie={chosenMovie}
        movies={filteredMovies}
        similarMovies={similarMoviesToChosen}
        reviews={reviews}
        onMovieClick={onCardClick}
        onPlayClick={onPlayClick}
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
            onPlayClick={onPlayClick}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  const {genre, chosenMovieId, allMovies, mainCard, showingMoviesCount, playingMovie} = state;

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
    mainCard,
    filteredMovies: displayedNumberOfFilms,
    isButtonShowMoreDisplayed,
    chosenMovieId,
    chosenMovie,
    similarMoviesToChosen,
    playingMovie,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onShowMoreClick() {
    dispatch(ActionCreator.increaseShowingMovies());
  },
  onCardClick(id) {
    dispatch(ActionCreator.changeMovie(id));
  },
  onPlayClick(movie) {
    dispatch(ActionCreator.openPlayer(movie));
  },
});

App.propTypes = {
  mainCard: PropTypes.object,
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
  onPlayClick: PropTypes.func.isRequired,
  playingMovie: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
