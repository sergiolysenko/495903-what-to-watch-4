import React from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import {movieShape, commentsShape} from "../utils/constants.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import PlayButton from "../play-button/play-button.jsx";
import {Header} from "../header/header.jsx";

const TabsWrapped = withActiveItem(Tabs);

const MoviePage = (props) => {
  const {movie, comments, onMovieClick, onPlayClick, similarMovies, onAddReviewClick, isAuthorised} = props;
  const {title, genre, year, backgroundImg, posterImg, backgroundColor} = movie;

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
                onPlayClick={() => onPlayClick(movie.id)}
              />

              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
              {isAuthorised && <a
                onClick={(evt) => {
                  evt.preventDefault();
                  onAddReviewClick();
                }}
                href="add-review.html" className="btn movie-card__button">Add review</a>}
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
            comments={comments}
          />

        </div>
      </div>
    </section>
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <MoviesList
          movies={similarMovies}
          onClick={onMovieClick}
        />
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>);
};

MoviePage.propTypes = {
  movie: movieShape,
  similarMovies: PropTypes.arrayOf(movieShape),
  comments: commentsShape,
  onMovieClick: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onAddReviewClick: PropTypes.func.isRequired,
  isAuthorised: PropTypes.bool.isRequired,
};

export default MoviePage;
