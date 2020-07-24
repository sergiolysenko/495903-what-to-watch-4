import React from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import GenreList from "./../genre-list/genre-list.jsx";
import {Header} from "../header/header.jsx";

import {movieShape} from "../utils/constants.js";
import {ShowMore} from "../show-more/show-more.jsx";
import PlayButton from "../play-button/play-button.jsx";

const Main = (props) => {
  const {mainCard, movies, isButtonShowMoreDisplayed, onMovieClick, onShowMoreClick, onPlayClick, authorizationStatus} = props;

  const {title, genre, year, backgroundImg, posterImg} = mainCard;

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={backgroundImg} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header
          authorizationStatus={authorizationStatus}
        />

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={posterImg} alt={`${title} + poster`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>

              <div className="movie-card__buttons">
                <PlayButton
                  onPlayClick={() => onPlayClick(mainCard.id)}
                />
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreList />
          <MoviesList
            movies={movies}
            onClick={onMovieClick}
          />
          {isButtonShowMoreDisplayed &&
            <ShowMore
              onClick={onShowMoreClick}
            />
          }
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
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
    </React.Fragment>
  );
};

Main.propTypes = {
  mainCard: movieShape,
  movies: PropTypes.arrayOf(movieShape),
  isButtonShowMoreDisplayed: PropTypes.bool.isRequired,
  onMovieClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

export default Main;
