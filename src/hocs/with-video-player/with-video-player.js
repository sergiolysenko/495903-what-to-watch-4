import React from "react";
import {secondsToTime} from "../../components/utils/utils.js";
import {getMovieById} from "../../reducer/data/selectors.js";
import {compose} from "redux";
import {connect} from "react-redux";
import {movieShape} from "../../components/utils/constants.js";

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.videoRef = React.createRef();

      this.state = {
        isPlaying: false,
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

    handleMovieTime(evt) {
      const video = this.videoRef.current;

      const percent = evt.nativeEvent.offsetX / evt.target.offsetWidth;
      video.currentTime = percent * video.duration;
    }

    componentDidUpdate() {
      const {movie} = this.props;

      if (movie) {
        const video = this.videoRef.current;

        if (this.state.isPlaying) {
          video.play();
          video.ontimeupdate = () => {
            this.setState({
              currentTime: Math.round(video.currentTime),
            });
          };
        } else {
          video.pause();
        }
      }
    }

    componentWillUnmount() {
      const {movie} = this.props;

      if (movie) {
        const video = this.videoRef.current;

        video.onplay = null;
        video.onpause = null;
        video.onloadedmetadata = null;
        video.ontimeupdate = null;
        video.src = ``;
      }
    }

    render() {
      const {isPlaying} = this.state;
      const {movie} = this.props;
      const video = this.videoRef.current;
      let progress = 0;
      let timeLeft = `00:00:00`;

      if (!movie) {
        return null;
      }

      if (video && video.duration) {
        progress = this.state.currentTime / video.duration * 100;
        timeLeft = secondsToTime(video.duration - this.state.currentTime);
      }

      const {videoLink, cardImg} = movie;
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
            muted={false}
            src={videoLink}
            poster={cardImg}
            autoPlay={false}
            onClick={this.handlePlayClick}
            ref={this.videoRef}
            className="player__video"
          />
        </Component>
      );
    }

    handlePlayClick() {
      this.setState((prevState) => ({isPlaying: !prevState.isPlaying}));
    }
  }

  WithVideoPlayer.propTypes = {
    movie: movieShape,
  };

  return WithVideoPlayer;
};

const mapStateToProps = (state, props) => {
  const {historyProps} = props;
  const id = historyProps.match.params.id;

  return {
    movie: getMovieById(state, id),
  };
};

const composedWithVideoPlayer = compose(
    connect(mapStateToProps),
    withVideoPlayer
);
export {withVideoPlayer};

export default composedWithVideoPlayer;


