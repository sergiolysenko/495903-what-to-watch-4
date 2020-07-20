import React from "react";
import PropTypes from "prop-types";

const VideoPlayer = (props) => {
  const {children, progress, timeLeft, isControlled, handlePlayClick, isPlaying, handleFullScreen} = props;

  return (
    <div className={isControlled && `player`}>
      {children}
      {isControlled && <React.Fragment>
        <button type="button" className="player__exit">Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={progress} max="100"></progress>
              <div className="player__toggler"
                style={{left: `${progress}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{timeLeft}</div>
          </div>

          <div className="player__controls-row">
            {isPlaying ?
              <button
                onClick={handlePlayClick}
                type="button" className="player__play">
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </button> :
              <button
                onClick={handlePlayClick}
                type="button" className="player__play">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
            }

            <div className="player__name">Transpotting</div>

            <button
              onClick={handleFullScreen}
              type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </React.Fragment>
      }
    </div>

  );
};

VideoPlayer.propTypes = {
  isControlled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  handlePlayClick: PropTypes.func,
  isPlaying: PropTypes.bool,
  progress: PropTypes.number.isRequired,
  handleFullScreen: PropTypes.func.isRequired,
  timeLeft: PropTypes.string.isRequired,
};

export default VideoPlayer;
