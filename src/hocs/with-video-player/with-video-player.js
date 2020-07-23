import React from "react";
import PropTypes from "prop-types";
import {secondsToTime} from "../../components/utils/utils.js";

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.videoRef = React.createRef();

      this.state = {
        isPlaying: this.props.isPlaying,
        currentTime: 0,
      };

      this.handlePlayClick = this.handlePlayClick.bind(this);
      this.handleFullScreen = this.handleFullScreen.bind(this);
      this.handleMovieTime = this.handleMovieTime.bind(this);
    }

    handleFullScreen() {
      const video = this.videoRef.current;

      if (video.fullscreenElement) {
        video.exitFullScreen();
      } else {
        video.requestFullscreen();
      }
    }

    componentDidMount() {
      const {isMuted, source, poster, width, height} = this.props;

      const video = this.videoRef.current;
      video.muted = isMuted;
      video.src = source;
      video.width = width;
      video.height = height;
      video.poster = poster;

      video.ontimeupdate = () => {
        this.setState({
          currentTime: video.currentTime,
        });
      };
    }

    handleMovieTime(evt) {
      const video = this.videoRef.current;

      const percent = evt.nativeEvent.offsetX / evt.target.offsetWidth;
      video.currentTime = percent * video.duration;
    }

    componentDidUpdate() {
      const video = this.videoRef.current;

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this.videoRef.current;

      video.onplay = null;
      video.onpause = null;
      video.ontimeupdate = null;
      video.src = ``;
    }

    render() {
      const {isPlaying} = this.state;
      const video = this.videoRef.current;
      let progress = 0;
      let timeLeft = `00:00:00`;
      if (video) {
        progress = Math.floor(this.state.currentTime / video.duration * 100);
        timeLeft = secondsToTime(video.duration - this.state.currentTime);
      }

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          progress={progress}
          timeLeft={timeLeft}
          handlePlayClick={this.handlePlayClick}
          handleFullScreen={this.handleFullScreen}
          handleMovieTime={this.handleMovieTime}
        >
          <video
            autoPlay={true}
            onClick={this.handlePlayClick}
            className="player__video"
            ref={this.videoRef}
          />
        </Component>
      );
    }

    handlePlayClick() {
      this.setState((prevState) => ({isPlaying: !prevState.isPlaying}));
    }
  }
  WithVideoPlayer.propTypes = {
    isMuted: PropTypes.bool.isRequired,
    source: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    isPlaying: PropTypes.bool,
  };

  return WithVideoPlayer;
};

export default withVideoPlayer;


