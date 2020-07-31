import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import {movieShape, commentsShape} from "../utils/constants.js";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator, Operation as AppStateOperation} from "../../reducer/app-state/app-state.js";
import {getChosenMovieId, getGenre, getPlayingMovie, getChosenMovie, displayShowMoreButton, getListOfDisplayedMovies, getSilimalMoviesToChosen, getWritingCommentFlag, getSendingCommentDataFlag, getPostingError} from "../../reducer/app-state/selectors.js";
import {getMovies, getMainMovie, getFilteredMoviesByGenre, getComments} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selector.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import MoviePage from "../movie-page/movie-page.jsx";
import VideoPlayer from "../video-player/video-player.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";
import {SingIn} from "../sing-in/sing-in.jsx";
import {AddReview} from "../add-review/add-review.jsx";
import history from "../../history.js";
import {AppRoute} from "../utils/constants.js";
import {findMovieById} from "../utils/utils.js";

const VideoPlayerWrapped = withVideoPlayer(VideoPlayer);

class App extends React.PureComponent {
  renderApp() {
    const {mainCard, movies, isButtonShowMoreDisplayed, onShowMoreClick, chosenMovieId, onCardClick, onPlayClick, playingMovie, chosenMovie, similarMoviesToChosen, isAuthorised, comments, onCommentSubmit, isCommentWriting, onAddReviewClick, isSendingCommentData, isPostingError} = this.props;

    if (isCommentWriting) {
      return <AddReview
        movie={chosenMovie}
        onSubmit={onCommentSubmit}
        isSendingCommentData={isSendingCommentData}
        isPostingError={isPostingError}
        isAuthorised={isAuthorised}
      />;
    }

    return (
      <Main
        mainCard={mainCard}
        movies={movies}
        onMovieClick={onCardClick}
        isButtonShowMoreDisplayed={isButtonShowMoreDisplayed}
        onShowMoreClick={onShowMoreClick}
        onPlayClick={onPlayClick}
        isAuthorised={isAuthorised}
      />);
  }

  render() {
    const {mainCard, allMovies, movies, isButtonShowMoreDisplayed, onShowMoreClick, chosenMovieId, onCardClick, onPlayClick, playingMovie, similarMoviesToChosen, isAuthorised, comments, onCommentSubmit, isCommentWriting, onAddReviewClick, isSendingCommentData, isPostingError, onSingInClick} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this.renderApp()}
          </Route>
          <Route exact path={AppRoute.LOGIN}
            render={() => {
              return <SingIn
                onSingInClick={onSingInClick}
              />;
            }}
          />
          <Route
            exact path={AppRoute.PLAYER}
            render={() => {
              return <VideoPlayerWrapped
                isMuted={false}
                poster={playingMovie.cardImg}
                source={playingMovie.videoLink}
                isPlaying={true}
                onPlayClick={onPlayClick}
              />;
            }}
          />
          <Route
            exact path={AppRoute.FILM}
            render={(historyProps) => {
              const movieId = Number(historyProps.match.params.id);
              const chosenMovie = findMovieById(movies, movieId);
              return <MoviePage
                movie={chosenMovie}
                similarMovies={similarMoviesToChosen}
                comments={comments}
                onMovieClick={onCardClick}
                onPlayClick={onPlayClick}
                onAddReviewClick={onAddReviewClick}
                isAuthorised={isAuthorised}
              />;
            }}
          />
          <Route>
            <div>404 not found</div>
          </Route>
        </Switch>
      </Router>);
  }
}

const mapStateToProps = (state) => {
  const allMovies = getMovies(state);
  const genre = getGenre(state);
  const filteredMovies = getFilteredMoviesByGenre(state, genre);
  const displayedMoviesByButton = getListOfDisplayedMovies(state, filteredMovies);
  const chosenMovieId = getChosenMovieId(state);
  const authorizationStatus = getAuthorizationStatus(state);
  const isAuthorised = authorizationStatus === AuthorizationStatus.AUTH;

  return {
    mainCard: getMainMovie(state),
    movies: displayedMoviesByButton,
    allMovies,
    isButtonShowMoreDisplayed: displayShowMoreButton(state, displayedMoviesByButton),
    chosenMovieId,
    chosenMovie: getChosenMovie(state, filteredMovies),
    similarMoviesToChosen: getSilimalMoviesToChosen(state, filteredMovies),
    playingMovie: getPlayingMovie(state),
    isAuthorised,
    comments: getComments(state, chosenMovieId),
    isCommentWriting: getWritingCommentFlag(state),
    isSendingCommentData: getSendingCommentDataFlag(state),
    isPostingError: getPostingError(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onShowMoreClick() {
    dispatch(ActionCreator.increaseShowingMovies());
  },
  onCardClick(movieId) {
    dispatch(ActionCreator.changeMovie(movieId));
    dispatch(DataOperation.loadComments(movieId));
  },
  onPlayClick(movieId) {
    dispatch(ActionCreator.openPlayer(movieId));
  },
  onSingInClick(authData) {
    dispatch(UserOperation.login(authData));
  },
  onCommentSubmit(movieId, formData) {
    dispatch(AppStateOperation.postComment(movieId, formData));
  },
  onAddReviewClick() {
    dispatch(ActionCreator.writeComment(true));
  }
});

App.propTypes = {
  mainCard: movieShape,
  movies: PropTypes.arrayOf(movieShape).isRequired,
  isButtonShowMoreDisplayed: PropTypes.bool.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  chosenMovieId: PropTypes.number.isRequired,
  chosenMovie: PropTypes.object,
  similarMoviesToChosen: PropTypes.array,
  comments: commentsShape,
  onCardClick: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  playingMovie: PropTypes.object,
  isAuthorised: PropTypes.bool.isRequired,
  onSingInClick: PropTypes.func.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
  onAddReviewClick: PropTypes.func.isRequired,
  isCommentWriting: PropTypes.bool.isRequired,
  isSendingCommentData: PropTypes.bool.isRequired,
  isPostingError: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
