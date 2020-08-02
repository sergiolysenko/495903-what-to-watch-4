import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import {movieShape} from "../utils/constants.js";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator, Operation as AppStateOperation} from "../../reducer/app-state/app-state.js";
import {getGenre, displayShowMoreButton, getListOfDisplayedMovies, getSendingCommentDataFlag, getPostingError} from "../../reducer/app-state/selectors.js";
import {getMainMovie, getFilteredMoviesByGenre} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selector.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import MoviePage from "../movie-page/movie-page.jsx";
import VideoPlayer from "../video-player/video-player.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";
import {SingIn} from "../sing-in/sing-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import history from "../../history.js";
import {AppRoute} from "../utils/constants.js";
import MyList from "../my-list/my-list.jsx";

const VideoPlayerWrapped = withVideoPlayer(VideoPlayer);

class App extends React.PureComponent {
  renderApp() {
    const {mainCard, movies, isButtonShowMoreDisplayed, onShowMoreClick, isAuthorised} = this.props;

    return (
      <Main
        mainCard={mainCard}
        movies={movies}
        isButtonShowMoreDisplayed={isButtonShowMoreDisplayed}
        onShowMoreClick={onShowMoreClick}
        isAuthorised={isAuthorised}
      />);
  }

  render() {
    const {isAuthorised, onCommentSubmit, isSendingCommentData, isPostingError, onSingInClick} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this.renderApp()}
          </Route>
          <Route exact path={AppRoute.MY_LIST}
            render={() => {
              return <MyList />;
            }}
          />
          <Route exact path={AppRoute.LOGIN}
            render={() => {
              return <SingIn
                onSingInClick={onSingInClick}
              />;
            }}
          />
          <Route
            exact path={AppRoute.PLAYER}
            render={(historyProps) => {
              return <VideoPlayerWrapped
                historyProps={historyProps}
              />;
            }}
          />
          <Route
            exact path={AppRoute.FILM}
            render={(historyProps) => {
              return <MoviePage
                historyProps={historyProps}
                isAuthorised={isAuthorised}
              />;
            }}
          />
          <Route
            exact path={AppRoute.REVIEW}
            render={(historyProps) => {
              return <AddReview
                historyProps={historyProps}
                onSubmit={onCommentSubmit}
                isSendingCommentData={isSendingCommentData}
                isPostingError={isPostingError}
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
  const genre = getGenre(state);
  const filteredMovies = getFilteredMoviesByGenre(state, genre);
  const displayedMoviesByButton = getListOfDisplayedMovies(state, filteredMovies);
  const authorizationStatus = getAuthorizationStatus(state);
  const isAuthorised = authorizationStatus === AuthorizationStatus.AUTH;
  return {
    mainCard: getMainMovie(state),
    movies: displayedMoviesByButton,
    isButtonShowMoreDisplayed: displayShowMoreButton(state, displayedMoviesByButton),
    isAuthorised,
    isSendingCommentData: getSendingCommentDataFlag(state),
    isPostingError: getPostingError(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onShowMoreClick() {
    dispatch(ActionCreator.increaseShowingMovies());
  },
  onSingInClick(authData) {
    dispatch(UserOperation.login(authData));
  },
  onCommentSubmit(movieId, formData) {
    dispatch(AppStateOperation.postComment(movieId, formData));
  },
});

App.propTypes = {
  mainCard: movieShape,
  movies: PropTypes.arrayOf(movieShape).isRequired,
  isButtonShowMoreDisplayed: PropTypes.bool.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  isAuthorised: PropTypes.bool.isRequired,
  onSingInClick: PropTypes.func.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
  isSendingCommentData: PropTypes.bool,
  isPostingError: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
