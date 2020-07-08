import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import {VideoPreview} from "../utils/constants.js";

export default class SmallMovieCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.videoTimer);
  }

  handleHover() {
    this.videoTimer = setTimeout(() => this.setState({isPlaying: true}), VideoPreview.INTERVAL);
  }

  handleOut() {
    clearTimeout(this.videoTimer);

    this.setState({
      isPlaying: false,
    });
  }

  render() {
    const {movie, onClick, onHover} = this.props;
    const {id, title, cardImg, preview} = movie;

    return <article
      onMouseEnter={() => {
        this.handleHover();
        onHover(id);
      }}
      onMouseLeave={() => this.handleOut()}
      onClick={(evt) => {
        evt.preventDefault();
        onClick(id);
      }}
      className="small-movie-card catalog__movies-card">

      <div className="small-movie-card__image">
        <VideoPlayer
          isMuted={VideoPreview.IS_MUTED}
          poster={cardImg}
          source={preview}
          isPlaying={this.state.isPlaying}
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
    </article>;
  }
}

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cardImg: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired
};
