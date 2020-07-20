import React from "react";
import PropTypes from "prop-types";
import {VideoPreview} from "../utils/constants.js";
import VideoPlayer from "../video-player/video-player.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";

const VideoPlayerWrapped = withVideoPlayer(VideoPlayer);

const SmallMovieCard = (props) => {
  const {movie, isPlaying, onClick, onMouseEnter, onMouseLeave, isStopped} = props;
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
        <VideoPlayerWrapped
          isStopped={isStopped}
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
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cardImg: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isStopped: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default SmallMovieCard;
