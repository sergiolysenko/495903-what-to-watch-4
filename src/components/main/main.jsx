import React from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import GenreList from "./../genre-list/genre-list.jsx";
import {Header} from "../header/header.jsx";
import {movieShape} from "../../constants.js";
import {ShowMore} from "../show-more/show-more.jsx";
import PlayButton from "../play-button/play-button.jsx";
import MyListButton from "../my-list-button/my-list-button.jsx";
import Footer from "../footer/footer.jsx";

const Main = (props) => {
  const {mainCard, movies, isButtonShowMoreDisplayed, onShowMoreClick, isAuthorised} = props;

  const {title, genre, year, backgroundImg, posterImg} = mainCard;

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={backgroundImg} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header
          isAuthorised={isAuthorised}
          uniqueClasses="movie-card__head"
          isActiveLogoLink={false}
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
                  id={mainCard.id}
                />
                <MyListButton
                  movie={mainCard}
                />
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
          />
          {isButtonShowMoreDisplayed &&
            <ShowMore
              onClick={onShowMoreClick}
            />
          }
        </section>

        <Footer
          isActiveLogoLink={false}
        />
      </div>
    </React.Fragment>
  );
};

Main.propTypes = {
  mainCard: movieShape,
  movies: PropTypes.arrayOf(movieShape),
  isButtonShowMoreDisplayed: PropTypes.bool.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  isAuthorised: PropTypes.bool.isRequired,
};

export default Main;
