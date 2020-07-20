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
        progress: 0,
        timeLeft: `00:00:00`,
        isFullScreen: false,
      };

      this.handlePlayClick = this.handlePlayClick.bind(this);
      this.handleFullScreen = this.handleFullScreen.bind(this);
    }

    handleFullScreen() {
      const {isFullScreen} = this.state;
      const video = this.videoRef.current;

      if (isFullScreen) {
        video.exitFullScreen();
        this.setState({isFullScreen: false});
      } else {
        video.requestFullscreen();
        this.setState({isFullScreen: true});
        video.fullscreenElement = false;
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

      video.oncanplaythrough = () => this.setState({
        isLoading: false,
      });

      video.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      video.onpause = () => this.setState({
        isPlaying: false,
      });
      video.onloadedmetadata = () => {
        video.ontimeupdate = () => this.setState({
          progress: Math.floor(video.currentTime / video.duration * 100),
          timeLeft: secondsToTime(video.duration - video.currentTime),
        });
      };

    }

    componentDidUpdate(nextProps) {
      const video = this.videoRef.current;
      const {isPlaying} = this.props;
      if (nextProps.isPlaying !== isPlaying) {
        this.setState({
          isPlaying,
        });
      }

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
      if (this.props.isStopped) {
        video.load();
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
      const {isPlaying, progress, timeLeft} = this.state;
      const {isControlled} = this.props;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          progress={progress}
          timeLeft={timeLeft}
          isControlled={isControlled}
          handlePlayClick={this.handlePlayClick}
          handleFullScreen={this.handleFullScreen}
        >
          <video className={isControlled && `player__video`}
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
    isStopped: PropTypes.bool,
    isControlled: PropTypes.bool,
  };

  return WithVideoPlayer;
};

export default withVideoPlayer;


