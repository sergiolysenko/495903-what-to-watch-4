import React from "react";
import PropTypes from "prop-types";

export default class SmallCardVideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const {isMuted, source, poster, width, height} = this.props;

    const video = this.videoRef.current;
    video.muted = isMuted;
    video.src = source;
    video.width = width;
    video.height = height;
    video.poster = poster;
  }

  componentWillUnmount() {
    const video = this.videoRef.current;

    video.onplay = null;
    video.onpause = null;
    video.ontimeupdate = null;
    video.src = ``;

  }

  render() {
    return (
      <video
        ref={this.videoRef}
      />);
  }

  componentDidUpdate() {
    const video = this.videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }
}

SmallCardVideoPlayer.propTypes = {
  isMuted: PropTypes.bool.isRequired,
  source: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};
