import React from "react";
import PropTypes from "prop-types";
import {VideoPreview, movieShape} from "../utils/constants.js";
import SmallCardVideoPlayer from "../small-card-video-player/small-card-video-player.js";
import {AppRoute} from "../utils/constants.js";
import {Link} from "react-router-dom";

const SmallMovieCard = (props) => {
  const {movie, isPlaying, onMouseEnter, onMouseLeave} = props;
  const {id, title, cardImg, preview} = movie;

  return (
    <article
      onMouseEnter={() => {
        onMouseEnter();
      }}
      onMouseLeave={() => onMouseLeave()}
      className="small-movie-card catalog__movies-card">
      <Link
        className="small-movie-card__image"
        to={AppRoute.FILM.replace(`:id`, id)}
      >

        <SmallCardVideoPlayer
          isMuted={VideoPreview.IS_MUTED}
          poster={cardImg}
          source={preview}
          isPlaying={isPlaying}
          width={VideoPreview.WIDTH}
          height={VideoPreview.HEIGHT}
        />
      </Link>
      <h3 className="small-movie-card__title">
        <Link
          to={AppRoute.FILM.replace(`:id`, id)}
          className="small-movie-card__link"
        >{title}</Link>
      </h3>

    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: movieShape.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default SmallMovieCard;
