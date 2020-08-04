import React from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import {movieShape, commentsShape, MoviePages} from "../utils/constants.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import PlayButton from "../play-button/play-button.jsx";
import {Header} from "../header/header.jsx";
import {connect} from "react-redux";
import {getMovieById} from "../../reducer/data/selectors.js";
import {getSilimalMoviesToChosen} from "../../reducer/data/selectors.js";
import {Link} from "react-router-dom";
import {AppRoute} from "../utils/constants.js";
import MyListButton from "../my-list-button/my-list-button.jsx";
import Footer from "../footer/footer.jsx";

const MoviePage = (props) => {
  const {movie, similarMovies, isAuthorised} = props;

  const TabsWrapped = withActiveItem(Tabs, MoviePages.OVERVIEW);

  if (!movie) {
    return null;
  }

  const {id, title, genre, year, backgroundImg, posterImg, backgroundColor} = movie;

  return (<React.Fragment>
    <section
      style={{backgroundColor}}
      className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={backgroundImg} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header
          isAuthorised={isAuthorised}
        />

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{year}</span>
            </p>

            <div className="movie-card__buttons">

              <PlayButton
                id={id}
              />

              <MyListButton
                movie={movie}
              />
              {isAuthorised &&
              <Link
                to={AppRoute.REVIEW.replace(`:id`, id)} className="btn movie-card__button">Add review</Link>}
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={posterImg} alt={title + ` poster`} width="218" height="327" />
          </div>

          <TabsWrapped
            movie={movie}
            movieId={id}
          />

        </div>
      </div>
    </section>
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <MoviesList
          movies={similarMovies}
        />
      </section>

      <Footer />
    </div>
  </React.Fragment>);
};

const mapStateToProps = (state, props) => {
  const {id} = props;

  const chosenMovie = getMovieById(state, id);
  return {
    movie: chosenMovie,
    similarMovies: getSilimalMoviesToChosen(state, chosenMovie),
  };
};


MoviePage.propTypes = {
  movie: movieShape,
  similarMovies: PropTypes.arrayOf(movieShape),
  comments: commentsShape,
  isAuthorised: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(MoviePage);
