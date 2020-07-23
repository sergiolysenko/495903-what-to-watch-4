import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app-state/app-state.js";
import {getChosenMovieId, getGenre, getPlayingMovie, getChosenMovie, displayShowMoreButton, getListOfDisplayedMovies, getSilimalMoviesToChosen} from "../../reducer/app-state/selectors.js";
import {getMainMovie, getFilteredMoviesByGenre} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selector.js";
import {Operation} from "../../reducer/user/user.js";
import MoviePage from "../movie-page/movie-page.jsx";
import VideoPlayer from "../video-player/video-player.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";
import {movieShape} from "../utils/constants.js";
import {SingIn} from "../sing-in/sing-in.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const VideoPlayerWrapped = withVideoPlayer(VideoPlayer);

const App = (props) => {
  const {mainCard, filteredMovies, reviews, isButtonShowMoreDisplayed, onShowMoreClick, chosenMovieId, onCardClick, onPlayClick, playingMovie, chosenMovie, similarMoviesToChosen, authorizationStatus, onSingInClick} = props;

  const renderApp = () => {
    if (playingMovie) {
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        return <VideoPlayerWrapped
          isMuted={false}
          poster={playingMovie.cardImg}
          source={playingMovie.videoLink}
          isPlaying={true}
          onPlayClick={onPlayClick}
        />;
      } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return <SingIn
          onSingInClick={onSingInClick}
        />;
      }
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
          authorizationStatus={authorizationStatus}
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
        <Route exact path="/sing-in">
          <SingIn
            onSingInClick={onSingInClick}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  const genre = getGenre(state);
  const movies = getFilteredMoviesByGenre(state, genre);
  const listOfDisplayedMovies = getListOfDisplayedMovies(state, movies);

  return {
    mainCard: getMainMovie(state),
    filteredMovies: listOfDisplayedMovies,
    isButtonShowMoreDisplayed: displayShowMoreButton(state, listOfDisplayedMovies),
    chosenMovieId: getChosenMovieId(state),
    chosenMovie: getChosenMovie(state, movies),
    similarMoviesToChosen: getSilimalMoviesToChosen(state, movies),
    playingMovie: getPlayingMovie(state),
    authorizationStatus: getAuthorizationStatus(state),
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
  onSingInClick(authData) {
    dispatch(Operation.login(authData));
  }
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
  authorizationStatus: PropTypes.string.isRequired,
  onSingInClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
