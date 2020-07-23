import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app-state/app-state.js";
import {getChosenMovieId, getGenre, getPlayingMovie, getChosenMovie, displayShowMoreButton, getListOfDisplayedMovies, getSilimalMoviesToChosen} from "../../reducer/app-state/selectors.js";
import {getMovies, getMainMovie, getFilteredMoviesByGenre} from "../../reducer/data/selectors.js";
import MoviePage from "../movie-page/movie-page.jsx";
import VideoPlayer from "../video-player/video-player.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";
import {movieShape} from "../utils/constants.js";

const VideoPlayerWrapped = withVideoPlayer(VideoPlayer);

const App = (props) => {
  const {mainCard, movies, reviews, isButtonShowMoreDisplayed, onShowMoreClick, chosenMovieId, onCardClick, onPlayClick, playingMovie, chosenMovie, similarMoviesToChosen} = props;

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
          movies={movies}
          onMovieClick={onCardClick}
          isButtonShowMoreDisplayed={isButtonShowMoreDisplayed}
          onShowMoreClick={onShowMoreClick}
          onPlayClick={onPlayClick}
        />);
    }

    return (
      <MoviePage
        movie={chosenMovie}
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
            movie={movies[0]}
            similarMovies={similarMoviesToChosen}
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
  const genre = getGenre(state);
  const movies = getMovies(state);
  const filteredMovies = getFilteredMoviesByGenre(state, genre);
  const displayedMoviesByButton = getListOfDisplayedMovies(state, filteredMovies);

  return {
    mainCard: getMainMovie(state),
    movies: displayedMoviesByButton,
    isButtonShowMoreDisplayed: displayShowMoreButton(state, displayedMoviesByButton),
    chosenMovieId: getChosenMovieId(state),
    chosenMovie: getChosenMovie(state, filteredMovies),
    similarMoviesToChosen: getSilimalMoviesToChosen(state, filteredMovies),
    playingMovie: getPlayingMovie(state, movies),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onShowMoreClick() {
    dispatch(ActionCreator.increaseShowingMovies());
  },
  onCardClick(id) {
    dispatch(ActionCreator.changeMovie(id));
  },
  onPlayClick(id) {
    dispatch(ActionCreator.openPlayer(id));
  },
});

App.propTypes = {
  mainCard: PropTypes.object,
  movies: PropTypes.arrayOf(movieShape).isRequired,
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
