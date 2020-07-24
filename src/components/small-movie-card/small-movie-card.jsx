import React from "react";
import PropTypes from "prop-types";
import {VideoPreview, movieShape} from "../utils/constants.js";
import SmallCardVideoPlayer from "../small-card-video-player/small-card-video-player.js";

const SmallMovieCard = (props) => {
  const {movie, isPlaying, onClick, onMouseEnter, onMouseLeave} = props;
  const {id, title, cardImg, preview} = movie;

  return (
    <article
      onMouseEnter={() => {
        onMouseEnter();
      }}
      onMouseLeave={() => onMouseLeave()}
      onClick={(evt) => {
        evt.preventDefault();
        onClick(id);
      }}
      className="small-movie-card catalog__movies-card">

      <div className="small-movie-card__image">
        <SmallCardVideoPlayer
          isMuted={VideoPreview.IS_MUTED}
          poster={cardImg}
          source={preview}
          isPlaying={isPlaying}
          width={VideoPreview.WIDTH}
          height={VideoPreview.HEIGHT}
        />
      </div>
      <h3 className="small-movie-card__title">
        <a
          onClick={(evt) => {
            evt.preventDefault();
            onClick(id);
          }}
          className="small-movie-card__link"
          href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: movieShape.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default SmallMovieCard;
