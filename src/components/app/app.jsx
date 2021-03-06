import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import {movieShape, AppRoute} from "../../constants.js";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator, Operation as AppStateOperation} from "../../reducer/app-state/app-state.js";
import {getGenre, displayShowMoreButton, getListOfDisplayedMovies, getSendingCommentDataFlag, getPostingError} from "../../reducer/app-state/selectors.js";
import {getMainMovie, getFilteredMoviesByGenre} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus, getFlagEmailValid} from "../../reducer/user/selector.js";
import {AuthorizationStatus, Operation as UserOperation} from "../../reducer/user/user.js";
import MoviePage from "../movie-page/movie-page.jsx";
import VideoPlayer from "../video-player/video-player.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";
import {SingIn} from "../sing-in/sing-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import history from "../../history.js";
import MyList from "../my-list/my-list.jsx";
import PrivateRoute from "../private-route/private-route.jsx";

const VideoPlayerWrapped = withVideoPlayer(VideoPlayer);

class App extends React.PureComponent {
  renderApp() {
    const {mainCard, movies, isButtonShowMoreDisplayed, onShowMoreClick, isAuthorised} = this.props;
    if (!movies || !mainCard) {
      return null;
    }

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
    const {isAuthorised, onCommentSubmit, isSendingCommentData, isPostingError, onSingInClick, isEmailValid} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this.renderApp()}
          </Route>
          <Route exact path={AppRoute.LOGIN}
            render={() => {
              return isAuthorised ?
                <Redirect to={AppRoute.ROOT} />
                :
                <SingIn
                  onSingInClick={onSingInClick}
                  isEmailValid={isEmailValid}
                />;
            }}
          />
          <Route
            exact path={AppRoute.PLAYER}
            render={(historyProps) => {
              return <VideoPlayerWrapped
                id={historyProps.match.params.id}
              />;
            }}
          />
          <Route
            exact path={AppRoute.FILM}
            render={(historyProps) => {
              return <MoviePage
                id={historyProps.match.params.id}
                isAuthorised={isAuthorised}
              />;
            }}
          />
          <PrivateRoute
            exact path={AppRoute.MY_LIST}
            render={() => {
              return <MyList />;
            }}
          />
          <PrivateRoute
            exact path={AppRoute.REVIEW}
            render={(historyProps) => {
              return <AddReview
                id={historyProps.match.params.id}
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
  isEmailValid: PropTypes.bool.isRequired,
};

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
    isEmailValid: getFlagEmailValid(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
